var Translation = {
    preferredLanguage: 'en',
    supportedLanguages : ['en'],
    en:
    {
      calculate_viewTitle: "When Can I Retire?",
      calculate_monthlyIncome: "Monthly Income",
      calculate_currentNetWorth: "Net Worth",
      calculate_savingRate: "Saving Rate",
      calculate_expectedReturn: "Return Rate",
      calculate_withdrawalRate: "Withdrawal Rate",
      calculate_monthlySavings: "Monthly Savings",
      calculate_monthlySpending: "Monthly Spending",
      calculate_yearlySpending: "Yearly Spending",
      calculate_nestEgg: "Nest Egg",
      calculate_retirementDate: "Retire on",
      calculate_yearsToRetirement: "Retire in"
    },

    registerWithProvider: function(provider){
      this.supportedLanguages.forEach( function(value) {
            provider.translations(value, this[value]);
      }, this);

      provider.preferredLanguage(this.preferredLanguage);
    }
}
