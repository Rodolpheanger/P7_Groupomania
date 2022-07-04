const getLocalAuthDatas = () => {
  if (localStorage.length !== 0) {
    const datas = localStorage.getItem("data");
    const objectDatas = JSON.parse(datas);
    return objectDatas;
  } else {
  }
  return "";
};
export const localAuthDatas = getLocalAuthDatas();
