var Translation = {
    preferredLanguage: 'en',
    supportedLanguages : ['en'],
    en:
    {
      calculate_viewTitle:         "When Can I Retire?",
      calculate_monthlyIncome:     "Monthly Income",
      calculate_currentNetWorth:   "Net Worth",
      calculate_savingRate:        "Saving Rate",
      calculate_monthlySavings:    "Monthly Savings",
      calculate_monthlySpending:   "Monthly Spending",
      calculate_yearlySpending:    "Yearly Spending",
      calculate_nestEgg:           "Nest Egg",
      calculate_retirementDate:    "Retirement Date",
      calculate_yearsToRetirement: "Years To Retirement",
      calculate_chartTitle:        "Yearly Spending vs Investing Income",
      return_viewTitle:            "Return Rate",
      return_returnSlider:         "Return",
      withdrawal_viewTitle:        "Withdrawal Rate",
      withdrawal_withdrawalSlider: "Withdrawal",
      info_viewTitle:              "Information",
      info_assumptionsTitle:       "Assumptions",
      info_aboutTitle:             "About",
      about_viewTitle:             "Open Personal Finance",
      details_viewTitle:           "Details"
      
    },

    registerWithProvider: function(provider){
      this.supportedLanguages.forEach( function(value) {
            provider.translations(value, this[value]);
      }, this);

      provider.preferredLanguage(this.preferredLanguage);
    }
}
