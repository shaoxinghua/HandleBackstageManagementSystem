import { MessageBox,Message } from 'element-ui';

export function confirm(params){
  MessageBox.confirm(params.content, params.title||'提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: params.type||'warning',
    center: true
  }).then(() => {
    params.fn && params.fn()
    Message.success({
      message: '删除成功!'
    });
  }).catch(() => {
    params.catchfn && params.catchfn()
    Message.info({
      message: '已取消删除'
    });
  });
}