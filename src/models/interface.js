import schema from './';

export const wsGetLoader = schema.get('/api/applications', {
});

// 获取订单列表
export const wsAppDetail = schema.get('/api/application', {
  // token: { type: String, required: true },
  appId: { type: String, required: true },
});

// 获取订单列表
export const wsAddNode = schema.post('/api/node?appId={appId}', {
  // token: { type: String, required: true },
  appId: { type: String, required: true },
});

// 获取订单列表
export const wsRemoveNode = schema.delete('/api/node?appId={appId}&nodeId={nodeId}', {
  // token: { type: String, required: true },
  appId: { type: String, required: true },
  nodeId: { type: String, required: true },
});

