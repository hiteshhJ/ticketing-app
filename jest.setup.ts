import '@testing-library/jest-dom'

// hack to remove data-pkgid that fable populates with version currently (if not excluded would break all snapshots on every release)
expect.addSnapshotSerializer({
  test: (val: unknown) => typeof val === 'string',
  print: (val) => `"${val as string}"`.replace(/"@sainsburys-tech\/.*"/g, '"fable-component"'),
})
