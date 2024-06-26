const generateDate = () => {
    
    const data = new Date();

    const hours = data.getHours();
    const minutes = data.getMinutes();
    const secondes = data.getSeconds();
    
    const day = data.getDay();

    const dataBR = data.toLocaleDateString('pt-br')

    const formatDate = `${dataBR} - ${hours}:${minutes}:${secondes}`;

     return formatDate
}

export {
    generateDate
}

