export const Status = {
    BACKLOG: `backlog`,
    PROCESSING: `progress`,
    DONE: `ready`,
    BASKET: `basket`,
};
  
export const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`,
};

export const StatusArray = [
    Status.BACKLOG,
    Status.PROCESSING,
    Status.DONE,
    Status.BASKET,
];
