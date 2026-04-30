import type { ThemeConfig } from 'antd';

export const adminTheme: ThemeConfig = {
  token: {
    // ── Brand palette ──────────────────────────────────
    colorPrimary: '#6366f1',        // Indigo-500
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',

    // ── Typography ─────────────────────────────────────
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSize: 14,
    borderRadius: 8,
    borderRadiusLG: 12,

    // ── Dark background system ─────────────────────────
    colorBgBase: '#0f172a',         // slate-900
    colorBgContainer: '#1e293b',    // slate-800
    colorBgElevated: '#1e293b',
    colorBgLayout: '#0f172a',
    colorBgSpotlight: '#334155',    // slate-700

    colorText: '#f1f5f9',           // slate-100
    colorTextSecondary: '#94a3b8',  // slate-400
    colorTextTertiary: '#64748b',   // slate-500
    colorTextQuaternary: '#475569', // slate-600

    colorBorder: '#334155',
    colorBorderSecondary: '#1e293b',

    colorSplit: '#334155',

    // ── Shadows ───────────────────────────────────────
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.4)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.4)',
  },
  components: {
    Layout: {
      siderBg: '#0f172a',
      headerBg: '#1e293b',
      bodyBg: '#0f172a',
      triggerBg: '#1e293b',
      triggerColor: '#f1f5f9',
    },
    Menu: {
      darkItemBg: '#0f172a',
      darkSubMenuItemBg: '#0f172a',
      darkItemSelectedBg: '#6366f1',
      darkItemHoverBg: '#1e293b',
      darkItemColor: '#94a3b8',
      darkItemSelectedColor: '#ffffff',
    },
    Card: {
      colorBgContainer: '#1e293b',
      colorBorderSecondary: '#334155',
    },
    Table: {
      colorBgContainer: '#1e293b',
      headerBg: '#0f172a',
      rowHoverBg: '#334155',
      borderColor: '#334155',
    },
    Modal: {
      contentBg: '#1e293b',
      headerBg: '#1e293b',
    },
    Drawer: {
      colorBgElevated: '#1e293b',
    },
    Input: {
      colorBgContainer: '#0f172a',
      colorBorder: '#334155',
      activeBorderColor: '#6366f1',
    },
    Select: {
      colorBgContainer: '#0f172a',
      colorBorder: '#334155',
      optionSelectedBg: '#1e293b',
    },
  },
};
