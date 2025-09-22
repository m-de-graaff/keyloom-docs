import * as React from "react";
import { RiNpmjsFill } from "react-icons/ri";
import { SiBun, SiPnpm } from "react-icons/si";
import { FaYarn } from "react-icons/fa";

type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string };

export const NpmIcon: React.FC<SvgProps> = (props) => <RiNpmjsFill />;

export const PnpmIcon: React.FC<SvgProps> = (props) => <SiPnpm />;

export const YarnIcon: React.FC<SvgProps> = (props) => <FaYarn />;

export const BunIcon: React.FC<SvgProps> = (props) => <SiBun />;
