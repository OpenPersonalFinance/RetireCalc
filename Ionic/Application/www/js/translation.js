var Translation = {
    preferredLanguage: 'en',
    supportedLanguages : ['en'],
    en:
    {
      calculate_viewTitle: "When Can I Retire?",
      calculate_monthlyIncome: "Monthly Income",
      calculate_currentNetWorth: "Current Net Worth",
      calculate_savingRate: "Saving Rate",
      calculate_expectedReturn: "Return Rate",
      calculate_withdrawalRate: "Withdrawal Rate",
    },

    registerWithProvider: function(provider){
      this.supportedLanguages.forEach( function(value) {
            provider.translations(value, this[value]);
      }, this);

      provider.preferredLanguage(this.preferredLanguage);
    }
}
