const M = [
  {id:'1',name:'Phở Thìn',address:'13 Lò Đúc, HN',lat:21.016,lng:105.847,rating:4.5},
  {id:'2',name:'Bún Chả Hàng Mành',address:'Hàng Mành, HN',lat:21.029,lng:105.852,rating:4.7},
  {id:'3',name:'Lẩu Đức',address:'45 Nguyễn Trãi, HN',lat:21.004,lng:105.808,rating:4.3},
  {id:'4',name:'Pizza Company',address:'Vincom, HN',lat:21.021,lng:105.807,rating:4.0},
  {id:'5',name:'Highlands Coffee',address:'Times City',lat:20.995,lng:105.867,rating:4.2},
]
export async function getRest(n: number, excl: string[]) {
  return M.filter(r => !excl.includes(r.id)).slice(0,n).map(r => ({...r,distance:Math.random()*2000}))
}