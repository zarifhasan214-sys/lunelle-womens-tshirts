import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: IconProps) => ({
  fill: "none",
  viewBox: "0 0 24 24",
  width: props.size ?? 20,
  height: props.size ?? 20,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function SearchIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="11" cy="11" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>;
}

export function HeartIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.7Z" /></svg>;
}

export function BagIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M5.3 8.5h13.4l.7 11H4.6l.7-11Z" /><path d="M8.5 8.5V6.8a3.5 3.5 0 0 1 7 0v1.7" /></svg>;
}

export function MenuIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m5 5 14 14M19 5 5 19" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

export function ChevronDownIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m6 9 6 6 6-6" /></svg>;
}

export function ChevronLeftIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m15 18-6-6 6-6" /></svg>;
}

export function ChevronRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m9 18 6-6-6-6" /></svg>;
}

export function PlusIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M12 5v14M5 12h14" /></svg>;
}

export function MinusIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M5 12h14" /></svg>;
}

export function TrashIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 7h16M10 11v5M14 11v5M6.5 7l.7 13h9.6l.7-13M9 7V4h6v3" /></svg>;
}

export function SlidersIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 7h16M4 17h16M8 4v6M16 14v6" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m5 12 4.5 4.5L19 7" /></svg>;
}

export function StarIcon(props: IconProps) {
  return <svg {...base(props)} fill="currentColor" stroke="none"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>;
}

export function InstagramIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.6" r=".7" fill="currentColor" stroke="none" /></svg>;
}

export function TikTokIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M15.2 4v10.5a3.7 3.7 0 1 1-3-3.6M15.2 4c.7 2.2 2.1 3.5 4.3 3.8" /></svg>;
}

export function MailIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="m4 6 8 6 8-6" /></svg>;
}

export function LockIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="5" y="10" width="14" height="10" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}

export function TruckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M3 6h11v10H3zM14 10h3l4 4v2h-7zM6.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" /></svg>;
}

export function CheckCircleIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="12" cy="12" r="8.5" /><path d="m8 12 2.7 2.7L16.5 9" /></svg>;
}
