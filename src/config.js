// ⚠️ This file has intentional formatting issues for Prettier to catch

export const config = {
  apiUrl: 'http://localhost:8001', // Double quotes instead of single
  timeout: 5000, // Extra spacing
  retries: 3,
}

export const formatters = {
  currency: value => `$${value.toFixed(2)}`,
  percentage: value => `${(value * 100).toFixed(1)}%`, // Extra spacing
  date: value => new Date(value).toLocaleDateString(),
}

// Missing trailing comma
export const colors = {
  critical: '#ff4d4f',
  important: '#faad14',
  niceToHave: '#52c41a',
}

// Inconsistent line length - this is a very long line that exceeds the printWidth of 100 characters configured in prettier
export const veryLongVariableName =
  'This is a very long string that definitely exceeds the configured printWidth limit and should be wrapped by Prettier'
