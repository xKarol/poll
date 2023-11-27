export function getLayout(
  LayoutComponent: React.ComponentType<{ children: React.ReactElement }>
) {
  function WrappedLayout(page: React.ReactElement) {
    return <LayoutComponent>{page}</LayoutComponent>;
  }
  WrappedLayout.displayName = "WrappedLayout";
  return WrappedLayout;
}
