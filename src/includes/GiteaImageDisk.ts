/**
 *
 * @param route 目录
 * @param file 文件
 * @returns
 */
const TeaFile = (route: string, file: string) => {
  return `${
    import.meta.env.VITE_GITEA_HOST
  }/yunzhenxing/imgdisk/raw/branch/master/${route}/${file}`;
};

export { TeaFile };
