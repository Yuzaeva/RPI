const Status = {
    BACKLOG: `backlog`,
    PROCESSING: `progress`,
    DONE: `ready`,
    BASKET: `basket`,
};
  
const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`,
};

export {Status, StatusLabel};