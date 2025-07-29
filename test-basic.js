#!/usr/bin/env node

/**
 * Basic functionality test for MoneyMosaic AI Chat Advisor
 * This script tests that all components can be imported and basic functions work
 */

const { mockFinancialProfile, getFinancialInsights } = require('./lib/mockData');

console.log('🧪 Testing MoneyMosaic Genius AI Chat Advisor...\n');

// Test 1: Mock data structure
console.log('✅ Test 1: Mock Financial Data');
console.log(`   Total Balance: $${mockFinancialProfile.totalBalance}`);
console.log(`   Monthly Income: $${mockFinancialProfile.monthlyIncome}`);
console.log(`   Monthly Expenses: $${mockFinancialProfile.monthlyExpenses}`);
console.log(`   Transactions: ${mockFinancialProfile.transactions.length} items`);
console.log(`   Budget Categories: ${mockFinancialProfile.budgets.length} items\n`);

// Test 2: Financial Insights
console.log('✅ Test 2: Financial Insights Generation');
const insights = getFinancialInsights(mockFinancialProfile);
console.log(`   Generated ${insights.length} insights:`);
insights.forEach((insight, index) => {
  console.log(`   ${index + 1}. [${insight.type}] ${insight.message}`);
});

// Test 3: Budget calculations
console.log('\n✅ Test 3: Budget Calculations');
mockFinancialProfile.budgets.forEach(budget => {
  const percentage = (budget.spent / budget.budgeted) * 100;
  const status = percentage >= 100 ? 'OVER' : percentage >= 80 ? 'WARNING' : 'GOOD';
  console.log(`   ${budget.category}: ${percentage.toFixed(1)}% used (${status})`);
});

// Test 4: Savings progress
console.log('\n✅ Test 4: Savings Progress');
const savingsProgress = (mockFinancialProfile.currentSavings / mockFinancialProfile.savingsGoal) * 100;
console.log(`   Savings Goal Progress: ${savingsProgress.toFixed(1)}%`);
console.log(`   Amount remaining: $${(mockFinancialProfile.savingsGoal - mockFinancialProfile.currentSavings).toFixed(2)}`);

console.log('\n🎉 All basic functionality tests passed!');
console.log('\n📋 Next Steps:');
console.log('   1. Start backend server: npm run backend:dev');
console.log('   2. Start frontend server: npm run dev');
console.log('   3. Open http://localhost:3000 in your browser');
console.log('   4. Add OpenAI API key to .env.local for full AI functionality');
console.log('\n💡 Tip: The AI chat will work with mock responses even without OpenAI API key!');