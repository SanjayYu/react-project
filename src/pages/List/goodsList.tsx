import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Table } from 'antd';
import s from './goodsList.module.less';
import { useStore, StoreProvider } from '@/store/setupContext.tsx';
// @ts-ignore
import { getColumns } from './const.ts';

const columns = getColumns({
  renderImg: text => <img src={text} alt="" />,
});

const GoodsList = observer(() => {
  const store = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickItem = useCallback(async () => {
    setLoading(true);
    await store.getGoodsList();
    setLoading(false);
  }, []);

  return (
    <div className={s.goodsListContainer}>
      <Table
        columns={columns}
        dataSource={store.goodsList.slice()}
        rowKey="id"
      />

      <Button
        type="primary"
        className={s.btn}
        loading={loading}
        onClick={handleClickItem}
      >
        获取新数据
      </Button>
    </div>
  );
});

export default () => (
  <StoreProvider>
    <GoodsList />
  </StoreProvider>
);
