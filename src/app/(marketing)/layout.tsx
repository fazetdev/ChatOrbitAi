interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({
  children,
}: MarketingLayoutProps): React.JSX.Element {
  return <>{children}</>;
}
