interface SkipLinkProps {
  href?: string;
}

export function SkipLink({ href = "#main-content" }: SkipLinkProps) {
  return (
    <a className="skip-link" href={href}>
      Skip to content
    </a>
  );
}
