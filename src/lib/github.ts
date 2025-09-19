import { App, Octokit } from 'octokit';
import type { ActionResponse, Feedback } from '@/components/feedback';

// Repository configuration via environment variables
const owner = process.env.GITHUB_FEEDBACK_OWNER;
const repo = process.env.GITHUB_FEEDBACK_REPO;
const DocsCategory = process.env.GITHUB_FEEDBACK_CATEGORY || 'Feedback';

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;

  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    throw new Error(
      'Missing GitHub App credentials: set GITHUB_APP_ID and GITHUB_APP_PRIVATE_KEY.',
    );
  }

  if (!owner || !repo) {
    throw new Error(
      'Missing repository config: set GITHUB_FEEDBACK_OWNER and GITHUB_FEEDBACK_REPO.',
    );
  }

  // Handle escaped newlines in private key (common in env vars)
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
  
  const app = new App({ appId, privateKey: formattedPrivateKey });

  try {
    const { data } = await app.octokit.request(
      'GET /repos/{owner}/{repo}/installation',
      {
        owner,
        repo,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      },
    );

    instance = await app.getInstallationOctokit(data.id);
    return instance;
  } catch (error: any) {
    throw new Error(
      `GitHub App not installed on ${owner}/${repo}. Please install the app on this repository. Original error: ${error.message}`,
    );
  }
}

interface RepositoryInfo {
  id: string;
  discussionCategories: {
    nodes: { id: string; name: string }[];
  };
}

let cachedDestination: RepositoryInfo | undefined;
async function getFeedbackDestination(): Promise<RepositoryInfo> {
  if (cachedDestination) return cachedDestination;
  const octokit = await getOctokit();

  if (!owner || !repo) {
    throw new Error('Missing repository config.');
  }

  const { repository }: { repository: RepositoryInfo } = await octokit.graphql(`
    query {
      repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(repo)}) {
        id
        discussionCategories(first: 25) { nodes { id name } }
      }
    }
  `);

  cachedDestination = repository;
  return repository;
}

export async function onRateAction(
  url: string,
  feedback: Feedback,
): Promise<ActionResponse> {
  'use server';
  const octokit = await getOctokit();
  const destination = await getFeedbackDestination();

  const category = destination.discussionCategories.nodes.find(
    (c) => c.name === DocsCategory,
  );

  if (!category) {
    throw new Error(
      `Please create a "${DocsCategory}" category in GitHub Discussions for ${owner}/${repo}.`,
    );
  }

  const title = `Feedback for ${url}`;
  const body = `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`;

  // Try to find existing discussion with the same title by the app user
  let {
    search: {
      nodes: [discussion],
    },
  }: {
    search: { nodes: { id: string; url: string }[] };
  } = await octokit.graphql(`
    query {
      search(type: DISCUSSION, query: ${JSON.stringify(`${title} in:title repo:${owner}/${repo} author:@me`)}, first: 1) {
        nodes { ... on Discussion { id url } }
      }
    }
  `);

  if (discussion) {
    await octokit.graphql(`
      mutation {
        addDiscussionComment(input: { body: ${JSON.stringify(body)}, discussionId: "${discussion.id}" }) {
          comment { id }
        }
      }
    `);
  } else {
    const result: { discussion: { id: string; url: string } } = await octokit.graphql(`
      mutation {
        createDiscussion(input: { repositoryId: "${destination.id}", categoryId: "${category.id}", body: ${JSON.stringify(body)}, title: ${JSON.stringify(title)} }) {
          discussion { id url }
        }
      }
    `);
    discussion = result.discussion;
  }

  return { githubUrl: discussion.url };
}
