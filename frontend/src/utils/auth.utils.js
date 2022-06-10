const getToken = () => {
  if (localStorage.length !== 0) {
    const datas = localStorage.getItem("data");
    const objectDatas = JSON.parse(datas);
    console.log("Token dans Auth.utils", objectDatas.token);
    return objectDatas.token;
  }
};

export const newToken = getToken();
