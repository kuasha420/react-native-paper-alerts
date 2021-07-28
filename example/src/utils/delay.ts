export const delay = (time = 0) => new Promise<number>((res) => setTimeout(() => res(time), time));

export default delay;
