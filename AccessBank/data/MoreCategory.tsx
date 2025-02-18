  import React, { useState } from 'react';
  import { ChevronDown, Search, CreditCard } from 'lucide-react'; 
  import { FontAwesome } from '@expo/vector-icons';
  
  const categories = [
      {
        title: 'Account',
        icon: <FontAwesome name="bank" size={15} color="#1E3A8A" />, 
        subOptions: [
          { title: 'Profile', icon: <FontAwesome name="user" size={20} color="#0D9488" />, link: 'ProfileScreen' }, 
          { title: 'Balance', icon: <FontAwesome name="money" size={20} color="#16A34A" />, link: 'BalanceScreen' }, 
          { title: 'Statements', icon: <FontAwesome name="file-text" size={20} color="#9333EA" />, link: 'StatementsScreen' }, 
          { title: 'Settings', icon: <FontAwesome name="cog" size={20} color="#F97316" />, link: 'SettingsScreen' }, 
          { title: 'Account Limits', icon: <FontAwesome name="sliders" size={20} color="#EF4444" />, link: 'LimitsScreen' }, 
          { title: 'Notifications', icon: <FontAwesome name="bell" size={20} color="#3B82F6" />, link: 'NotificationsScreen' }, 
          { title: 'Beneficiaries', icon: <FontAwesome name="users" size={20} color="#8B5CF6" />, link: 'BeneficiariesScreen' }, 
          { title: 'Currency Management', icon: <FontAwesome name="globe" size={20} color="#34D399" />, link: 'CurrencyScreen' }, 
          { title: 'Security', icon: <FontAwesome name="shield" size={20} color="#F59E0B" />, link: 'SecurityScreen' }, 
          { title: 'Transaction Limits', icon: <FontAwesome name="line-chart" size={20} color="#DB2777" />, link: 'TransactionLimitsScreen' }, 
          { title: 'Close Account', icon: <FontAwesome name="times-circle" size={20} color="#DC2626" />, link: 'CloseAccountScreen' }, 
          { title: 'Account Preferences', icon: <FontAwesome name="adjust" size={20} color="#10B981" />, link: 'AccountPreferencesScreen' }, 
        ],
      },
      
      {
        title: 'Transfers',
        icon: <FontAwesome name="exchange" size={24} color="#0D9488" />, 
        subOptions: [
          { title: 'Internal Transfer', icon: <FontAwesome name="arrow-right" size={20} color="#3B82F6" />, link: 'InternalTransferScreen' }, 
          { title: 'External Transfer', icon: <FontAwesome name="arrow-left" size={20} color="#EF4444" />, link: 'ExternalTransferScreen' }, 
          { title: 'Scheduled Transfer', icon: <FontAwesome name="clock-o" size={20} color="#F59E0B" />, link: 'ScheduledTransferScreen' }, 
          { title: 'Transfer History', icon: <FontAwesome name="history" size={20} color="#10B981" />, link: 'TransferHistoryScreen' }, 
          { title: 'Quick Transfer', icon: <FontAwesome name="bolt" size={20} color="#F97316" />, link: 'QuickTransferScreen' }, 
          { title: 'International Transfer', icon: <FontAwesome name="globe" size={20} color="#4F46E5" />, link: 'InternationalTransferScreen' }, 
          { title: 'Repeat Transfer', icon: <FontAwesome name="refresh" size={20} color="#9333EA" />, link: 'RepeatTransferScreen' }, 
          { title: 'Transfer Limits', icon: <FontAwesome name="line-chart" size={20} color="#DC2626" />, link: 'TransferLimitsScreen' }, 
          { title: 'Transfer Preferences', icon: <FontAwesome name="adjust" size={20} color="#34D399" />, link: 'TransferPreferencesScreen' }, 
          { title: 'Recipient Management', icon: <FontAwesome name="address-book" size={20} color="#2563EB" />, link: 'RecipientManagementScreen' }, 
          { title: 'Standing Orders', icon: <FontAwesome name="paper-plane" size={20} color="#D97706" />, link: 'StandingOrdersScreen' }, 
          { title: 'Transfer Fees', icon: <FontAwesome name="money" size={20} color="#16A34A" />, link: 'TransferFeesScreen' }, 
        ],
      },
      
      {
        title: 'Payment Methods',
        icon: <FontAwesome name="credit-card" size={24} color="#2563EB" />, 
        subOptions: [
          { title: 'Add Card', icon: <FontAwesome name="plus" size={20} color="#10B981" />, link: 'AddCardScreen' }, 
          { title: 'Manage Cards', icon: <FontAwesome name="tasks" size={20} color="#F59E0B" />, link: 'ManageCardsScreen' }, 
          { title: 'Wallet', icon: <FontAwesome name="money" size={20} color="#16A34A" />, link: 'WalletScreen' }, 
          { title: 'Payment History', icon: <FontAwesome name="file-text" size={20} color="#8B5CF6" />, link: 'PaymentHistoryScreen' }, 
          { title: 'Add Payment Method', icon: <FontAwesome name="plus-circle" size={20} color="#3B82F6" />, link: 'AddPaymentMethodScreen' }, 
          { title: 'Card Status', icon: <FontAwesome name="info" size={20} color="#4F46E5" />, link: 'CardStatusScreen' }, 
          { title: 'Card Limit', icon: <FontAwesome name="sliders" size={20} color="#D97706" />, link: 'CardLimitScreen' }, 
          { title: 'Block Card', icon: <FontAwesome name="ban" size={20} color="#EF4444" />, link: 'BlockCardScreen' }, 
          { title: 'Activate Card', icon: <FontAwesome name="check-circle" size={20} color="#34D399" />, link: 'ActivateCardScreen' }, 
          { title: 'Link to Bank Account', icon: <FontAwesome name="link" size={20} color="#9333EA" />, link: 'LinkBankScreen' }, 
          { title: 'Contactless Payment', icon: <FontAwesome name="wifi" size={20} color="#0EA5E9" />, link: 'ContactlessPaymentScreen' }, 
          { title: 'Virtual Cards', icon: <FontAwesome name="credit-card-alt" size={20} color="#6B7280" />, link: 'VirtualCardsScreen' }, 
        ],
      },
      {
        title: 'Bill Payments',
        icon: <FontAwesome name="file" size={24} color="#4B5563" />, 
        subOptions: [
          { title: 'Utilities', icon: <FontAwesome name="lightbulb-o" size={20} color="#F59E0B" />, link: 'UtilitiesScreen' }, 
          { title: 'Mobile Recharge', icon: <FontAwesome name="mobile" size={20} color="#3B82F6" />, link: 'MobileRechargeScreen' }, 
          { title: 'Taxes', icon: <FontAwesome name="gavel" size={20} color="#9333EA" />, link: 'TaxesScreen' }, 
          { title: 'Subscriptions', icon: <FontAwesome name="newspaper-o" size={20} color="#2563EB" />, link: 'SubscriptionsScreen' }, 
          { title: 'School Fees', icon: <FontAwesome name="graduation-cap" size={20} color="#10B981" />, link: 'SchoolFeesScreen' }, 
          { title: 'Charity', icon: <FontAwesome name="heart" size={20} color="#DC2626" />, link: 'CharityScreen' }, 
          { title: 'Rent', icon: <FontAwesome name="home" size={20} color="#4B5563" />, link: 'RentScreen' }, 
          { title: 'Insurance Premiums', icon: <FontAwesome name="shield" size={20} color="#0EA5E9" />, link: 'InsurancePremiumsScreen' }, 
          { title: 'Credit Card Bills', icon: <FontAwesome name="credit-card" size={20} color="#F97316" />, link: 'CreditCardBillsScreen' }, 
          { title: 'Hospital Bills', icon: <FontAwesome name="medkit" size={20} color="#EF4444" />, link: 'HospitalBillsScreen' }, 
          { title: 'Loan Repayment', icon: <FontAwesome name="money" size={20} color="#16A34A" />, link: 'LoanRepaymentScreen' }, 
          { title: 'TV Subscriptions', icon: <FontAwesome name="television" size={20} color="#8B5CF6" />, link: 'TVSubscriptionScreen' }, 
        ],
      },
    
      {
        title: 'Lifestyle',
        icon: <FontAwesome name="life-ring" size={24} color="#1E90FF" />,
        subOptions: [
          { title: 'Shopping', icon: <FontAwesome name="shopping-bag" size={20} color="#FF6F61" />, link: 'ShoppingScreen' },
          { title: 'Travel', icon: <FontAwesome name="plane" size={20} color="#32CD32" />, link: 'TravelScreen' },
          { title: 'Entertainment', icon: <FontAwesome name="film" size={20} color="#DA70D6" />, link: 'EntertainmentScreen' },
          { title: 'Dining', icon: <FontAwesome name="cutlery" size={20} color="#FF4500" />, link: 'DiningScreen' },
          { title: 'Fitness', icon: <FontAwesome name="heartbeat" size={20} color="#7FFF00" />, link: 'FitnessScreen' },
          { title: 'Health', icon: <FontAwesome name="medkit" size={20} color="#00FA9A" />, link: 'HealthScreen' },
          { title: 'Beauty', icon: <FontAwesome name="magic" size={20} color="#8A2BE2" />, link: 'BeautyScreen' },
          { title: 'Gadgets', icon: <FontAwesome name="tablet" size={20} color="#4682B4" />, link: 'GadgetsScreen' },
          { title: 'Sports', icon: <FontAwesome name="futbol-o" size={20} color="#FFD700" />, link: 'SportsScreen' },
          { title: 'Events', icon: <FontAwesome name="calendar" size={20} color="#FF6347" />, link: 'EventsScreen' },
          { title: 'Books', icon: <FontAwesome name="book" size={20} color="#8A2BE2" />, link: 'BooksScreen' },
          { title: 'Music', icon: <FontAwesome name="music" size={20} color="#FF1493" />, link: 'MusicScreen' },
        ],
      },
      {
        title: 'Cheques and Cards',
        icon: <FontAwesome name="credit-card-alt" size={24} color="#4169E1" />,
        subOptions: [
          { title: 'Order Cheque', icon: <FontAwesome name="check-square" size={20} color="#32CD32" />, link: 'OrderChequeScreen' },
          { title: 'Manage Cards', icon: <FontAwesome name="tasks" size={20} color="#FF6347" />, link: 'ManageCardsScreen' },
          { title: 'Block Card', icon: <FontAwesome name="ban" size={20} color="#DC143C" />, link: 'BlockCardScreen' },
          { title: 'Card Status', icon: <FontAwesome name="info" size={20} color="#FFD700" />, link: 'CardStatusScreen' },
          { title: 'Activate Card', icon: <FontAwesome name="check-circle" size={20} color="#008080" />, link: 'ActivateCardScreen' },
          { title: 'Virtual Cards', icon: <FontAwesome name="credit-card-alt" size={20} color="#20B2AA" />, link: 'VirtualCardsScreen' },
          { title: 'Card PIN Management', icon: <FontAwesome name="key" size={20} color="#DC143C" />, link: 'CardPINScreen' },
          { title: 'Replacement Card', icon: <FontAwesome name="refresh" size={20} color="#FF6347" />, link: 'ReplacementCardScreen' },
          { title: 'Link to Wallet', icon: <FontAwesome name="link" size={20} color="#32CD32" />, link: 'LinkWalletScreen' },
          { title: 'Set Spending Limits', icon: <FontAwesome name="sliders" size={20} color="#1E90FF" />, link: 'SpendingLimitScreen' },
          { title: 'Card Alerts', icon: <FontAwesome name="bell" size={20} color="gray" />, link: 'CardAlertsScreen' },
          { title: 'Expired Cards', icon: <FontAwesome name="times-circle" size={20} color="#B22222" />, link: 'ExpiredCardsScreen' },
        ],
      },
      {
        title: 'Loans and Investments',
        icon: <FontAwesome name="money" size={24} color="#00BFFF" />,
        subOptions: [
          { title: 'Apply for Loan', icon: <FontAwesome name="arrow-circle-up" size={20} color="gray" />, link: 'ApplyLoanScreen' },
          { title: 'Investment Portfolio', icon: <FontAwesome name="briefcase" size={20} color="#32CD32" />, link: 'InvestmentPortfolioScreen' },
          { title: 'Loan Status', icon: <FontAwesome name="check-square" size={20} color="#FFD700" />, link: 'LoanStatusScreen' },
          { title: 'Repayment', icon: <FontAwesome name="credit-card" size={20} color="#20B2AA" />, link: 'RepaymentScreen' },
          { title: 'Loan History', icon: <FontAwesome name="history" size={20} color="#FF6347" />, link: 'LoanHistoryScreen' },
          { title: 'Interest Rates', icon: <FontAwesome name="percent" size={20} color="#FF4500" />, link: 'InterestRatesScreen' },
          { title: 'Investment Goals', icon: <FontAwesome name="flag" size={20} color="#8A2BE2" />, link: 'InvestmentGoalsScreen' },
          { title: 'P2P Lending', icon: <FontAwesome name="exchange" size={20} color="gray" />, link: 'P2PLendingScreen' },
          { title: 'Loan Calculator', icon: <FontAwesome name="calculator" size={20} color="#008080" />, link: 'LoanCalculatorScreen' },
          { title: 'Loan Types', icon: <FontAwesome name="list-ul" size={20} color="blue" />, link: 'LoanTypesScreen' },
          { title: 'Investment Risks', icon: <FontAwesome name="exclamation-triangle" size={20} color="red" />, link: 'InvestmentRisksScreen' },
          { title: 'Loan Refinancing', icon: <FontAwesome name="exchange" size={20} color="#1E90FF" />, link: 'LoanRefinancingScreen' },
        ],
      },
      
        
        
        
        
  ];


  export default categories;