import { useState } from 'react';
import { Button, Dropdown, notification } from 'antd';
import { DownloadOutlined, FileExcelOutlined, FileTextOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import * as XLSX from 'xlsx';

interface ExportButtonProps<T> {
  data: T[];
  filename?: string;
  columns?: Array<{ title: string; dataIndex: string | keyof T }>;
}

function ExportButton<T extends object>({ data, filename = 'export', columns }: ExportButtonProps<T>) {
  const [loading, setLoading] = useState(false);

  const getExportData = () => {
    if (!columns || columns.length === 0) return data;
    return data.map(item => {
      const row: Record<string, any> = {};
      columns.forEach(col => {
        row[col.title] = item[col.dataIndex as keyof T];
      });
      return row;
    });
  };

  const exportToExcel = () => {
    try {
      setLoading(true);
      const ws = XLSX.utils.json_to_sheet(getExportData());
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${filename}.xlsx`);
      notification.success({ message: 'Exported successfully to Excel' });
    } catch (error) {
      notification.error({ message: 'Failed to export Excel' });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    try {
      setLoading(true);
      const ws = XLSX.utils.json_to_sheet(getExportData());
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
      notification.success({ message: 'Exported successfully to CSV' });
    } catch (error) {
      notification.error({ message: 'Failed to export CSV' });
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'excel',
      label: 'Export as Excel',
      icon: <FileExcelOutlined style={{ color: '#22c55e' }} />,
      onClick: exportToExcel,
    },
    {
      key: 'csv',
      label: 'Export as CSV',
      icon: <FileTextOutlined style={{ color: '#3b82f6' }} />,
      onClick: exportToCSV,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button icon={<DownloadOutlined />} loading={loading} style={{ borderColor: '#334155', color: '#94a3b8' }}>
        Export
      </Button>
    </Dropdown>
  );
}

export default ExportButton;
