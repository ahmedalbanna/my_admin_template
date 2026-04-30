import type { TableProps } from 'antd';
import { Table, Typography } from 'antd';
import type { PaginationMeta } from '../../core/types';

const { Text } = Typography;

interface DataTableProps<T> extends TableProps<T> {
  meta?: PaginationMeta;
  onPageChange?: (page: number, limit: number) => void;
}

function DataTable<T extends object>({ meta, onPageChange, ...tableProps }: DataTableProps<T>) {
  return (
    <Table<T>
      {...tableProps}
      pagination={
        meta
          ? {
              current: meta.page,
              pageSize: meta.limit,
              total: meta.total,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => (
                <Text style={{ color: '#94a3b8' }}>
                  {range[0]}–{range[1]} of {total} records
                </Text>
              ),
              onChange: onPageChange,
            }
          : tableProps.pagination
      }
      scroll={{ x: 'max-content' }}
      style={{ borderRadius: 12 }}
    />
  );
}

export default DataTable;
