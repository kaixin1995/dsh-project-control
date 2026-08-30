/**
 * Project Control View Component:
 * Provides a rich multi-panel workbench for DeepSeek Harness:
 * 1. 📊 项目概览 (Project Overview)
 * 2. 🛠️ 变更工作台 (Change Workbench)
 * 3. ⚡ 执行中心 (Execution Center)
 * 4. 🧠 记忆与学习 (Memory & Insights)
 *
 * @module dsh-client-project-control/components/ProjectControlView
 */

import React, { useState } from 'react'

export interface ProjectControlViewProps {
  sessionId?: string
  t?: (key: string) => string
}

export function ProjectControlView(props: ProjectControlViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'changes' | 'execution' | 'memory'>('overview')

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--dsh-bg-base, #1e1e1e)',
    color: 'var(--dsh-text-base, #cccccc)',
    fontFamily: 'var(--dsh-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    overflow: 'hidden',
  }

  const navBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    padding: '12px 20px',
    borderBottom: '1px solid var(--dsh-border, #333333)',
    backgroundColor: 'var(--dsh-bg-elevated, #252526)',
  }

  const tabBtnStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: isActive ? 'var(--dsh-accent, #0e639c)' : 'transparent',
    color: isActive ? '#ffffff' : 'var(--dsh-text-muted, #999999)',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.15s ease',
  })

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px 28px',
    overflowY: 'auto',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--dsh-bg-surface, #2d2d2d)',
    borderRadius: '8px',
    border: '1px solid var(--dsh-border, #3c3c3c)',
    padding: '16px 20px',
    marginBottom: '16px',
  }

  const badgeStyle = (color = '#4ec9b0'): React.CSSProperties => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    backgroundColor: `${color}20`,
    color: color,
    fontWeight: 500,
    marginRight: '8px',
  })

  return React.createElement(
    'div',
    {
      'data-testid': 'project-control-main-view',
      style: containerStyle,
    },
    // Top Sub-Navigation
    React.createElement(
      'div',
      { style: navBarStyle },
      React.createElement(
        'button',
        {
          style: tabBtnStyle(activeTab === 'overview'),
          onClick: () => setActiveTab('overview'),
        },
        '📊 项目总览 (Overview)',
      ),
      React.createElement(
        'button',
        {
          style: tabBtnStyle(activeTab === 'changes'),
          onClick: () => setActiveTab('changes'),
        },
        '🛠️ 变更工作台 (Changes)',
      ),
      React.createElement(
        'button',
        {
          style: tabBtnStyle(activeTab === 'execution'),
          onClick: () => setActiveTab('execution'),
        },
        '⚡ 执行中心 (Execution)',
      ),
      React.createElement(
        'button',
        {
          style: tabBtnStyle(activeTab === 'memory'),
          onClick: () => setActiveTab('memory'),
        },
        '🧠 记忆与学习 (Memory & Insights)',
      ),
    ),
    // Content Panels
    React.createElement(
      'div',
      { style: contentAreaStyle },
      // Tab 1: Overview
      activeTab === 'overview' &&
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '18px', marginBottom: '16px', color: '#ffffff' } }, '项目运行状态 (Project Status)'),
          React.createElement(
            'div',
            { style: cardStyle },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } },
              React.createElement('span', { style: badgeStyle('#4ec9b0') }, 'Git 感知'),
              React.createElement('span', { style: badgeStyle('#569cd6') }, '真值验证'),
              React.createElement('span', { style: badgeStyle('#ce9178') }, 'DAG 调度'),
            ),
            React.createElement('p', { style: { margin: '8px 0', fontSize: '13px', lineHeight: '1.6' } },
              'Project Insight 控制中心已完全就绪。通过代码语义分析、变更范围隔离、四级真值验证与经验沉淀，确保 Agent 修改质量与系统稳定性。'
            ),
          ),
          React.createElement('h3', { style: { fontSize: '15px', margin: '20px 0 10px', color: '#ffffff' } }, '核心能力矩阵'),
          React.createElement(
            'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' } },
            React.createElement('div', { style: cardStyle },
              React.createElement('strong', { style: { color: '#4ec9b0', display: 'block', marginBottom: '6px' } }, '🛡️ 变更影响分析 (Impact Analysis)'),
              React.createElement('span', { style: { fontSize: '12px', color: '#999999' } }, 'AST 语法树 + 模块依赖图谱分析，精准识别级联风险与影响范围。')
            ),
            React.createElement('div', { style: cardStyle },
              React.createElement('strong', { style: { color: '#569cd6', display: 'block', marginBottom: '6px' } }, '🌿 Git 工作树隔离 (Worktree Sandbox)'),
              React.createElement('span', { style: { fontSize: '12px', color: '#999999' } }, '独立工作树内构建与测试，零污染主工作目录，支持原子合并。')
            ),
            React.createElement('div', { style: cardStyle },
              React.createElement('strong', { style: { color: '#dcdcaa', display: 'block', marginBottom: '6px' } }, '🔍 4级验证器 (Ground Truth)'),
              React.createElement('span', { style: { fontSize: '12px', color: '#999999' } }, '确定性构建/测试 > 证据断言 > LLM 评估 > 人工签发，杜绝虚假声称。')
            ),
            React.createElement('div', { style: cardStyle },
              React.createElement('strong', { style: { color: '#c586c0', display: 'block', marginBottom: '6px' } }, '🧠 分支感知记忆 (Branch Memory)'),
              React.createElement('span', { style: { fontSize: '12px', color: '#999999' } }, '架构决策按 Git 分支精准隔离，低频稳定注入，保护前缀缓存。')
            ),
          ),
        ),
      // Tab 2: Changes
      activeTab === 'changes' &&
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '18px', marginBottom: '16px', color: '#ffffff' } }, '变更工作台 (Change Workbench)'),
          React.createElement(
            'div',
            { style: cardStyle },
            React.createElement('strong', null, '活跃变更追踪'),
            React.createElement('p', { style: { fontSize: '13px', color: '#999999', margin: '8px 0' } },
              '当在聊天框中触发变更任务时，此处将实时展示文件变更 Diff、影响节点、执行计划及验收状态。'
            ),
          ),
        ),
      // Tab 3: Execution
      activeTab === 'execution' &&
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '18px', marginBottom: '16px', color: '#ffffff' } }, '执行控制中心 (Execution Center)'),
          React.createElement(
            'div',
            { style: cardStyle },
            React.createElement('strong', null, 'DAG 任务调度与 Attempt 监控'),
            React.createElement('p', { style: { fontSize: '13px', color: '#999999', margin: '8px 0' } },
              '调度器支持多步骤依赖拓扑执行、全抖动指数退避重试，以及崩溃扫描自愈恢复。'
            ),
          ),
        ),
      // Tab 4: Memory
      activeTab === 'memory' &&
        React.createElement(
          'div',
          null,
          React.createElement('h2', { style: { fontSize: '18px', marginBottom: '16px', color: '#ffffff' } }, '项目记忆与经验沉淀 (Memory & Insights)'),
          React.createElement(
            'div',
            { style: cardStyle },
            React.createElement('strong', null, '五轨记忆分层与 Git 分支绑定'),
            React.createElement('p', { style: { fontSize: '13px', color: '#999999', margin: '8px 0' } },
              '记录项目架构决策 (Architecture Decisions)、设计规范 (Pattern Rules) 与高危避坑指南 (Risk Hotspots)。'
            ),
          ),
        ),
    ),
  )
}
