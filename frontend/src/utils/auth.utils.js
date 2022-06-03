const getToken = () => {
  const datas = localStorage.getItem("data");
  const objectDatas = JSON.parse(datas);
  return objectDatas.token;
};

export const token = getToken();
