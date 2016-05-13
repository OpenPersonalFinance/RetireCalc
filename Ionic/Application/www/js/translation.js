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
      about_viewTitle:             "Virtual Method",
      
      withdrawal_p1:               "Withdrawal rate is the percentage of the net worth you plan to use each year after retirement to meet your spending needs.",
      withdrawal_p2:               "For example, if you spend $40,000 a year and you have a withdrawal rate of 4%, then you would need a net worth of $1,000,000 to meet these spending needs.  If you want to withdrawal 3% of your net worth to meet your needed $40,000 then you would need a larger net worth of $1,333,333.",
      withdrawal_p3:               "Choosing a different rate can change how much you need to save for retirement.",
      withdrawal_p4:               "$40,000 / 3% = $1,333,333",
      withdrawal_p5:               "$40,000 / 4% = $1,000,000",
      withdrawal_p6:               "$40,000 / 5% = $800,000",
      withdrawal_p7:               "Based on the Trinity Study, a withdrawal rate of 4% gives a retiree a 96% chance of having enough money for a 30 year retirement.  In fact, in many of the experiments, the retiree not only had enough money for 30 years, but the money actually grew such that they had enough money for a much longer retirement.",
      withdrawal_p8:               "Even though some people have raised concerns about the assumptions that went into the Trinity Study, a withdrawal rate of 4% is still used as a rule of thumb for many financial advisors and is often called the '4% rule' or the '4% Safe Withdrawal Rate'.",
      withdrawal_p9:               "If you are curious about the concerns or assumptions, we encourage you to research on your own.",
      
      return_p1:                   "Over the last 100 years the average return of the stock market has been around 11%, before expenses such as taxes, investment fees and inflation.  This is known as the nominal return. After you have adjusted for these expenses you are left with your real return.",
      return_p2:                   "On average,inflation has been around 3% per year.  So you can do a quick calculation by subtracting inflation from the nominal return to get an expected return of 7%.  This isn't the actual formula to account for inflation, but it is close enough for our purpose.",
      return_p3:                   "There is no guarantee that the next 100 years will be anything like the last 100. Past performance does not predict future results.  However, this is the best information available.",
      return_p4:                   "We have chosen a conservative return of 5%.  Feel free to be more or less conservative in your estimate.",
      
      about_p1:                    "This application is an open source personal finance project made by Virtual Method Labs.",
      about_p2:                    "We are not financial advisors. We are software developers with a passion for finance and bringing awareness to users.  We encourage you to research on your own before making any investment decisions.",
      about_p3:                    "If you have any questions or find any problems please e-mail virtualmethodlabs@gmail.com"
      
      
    },

    registerWithProvider: function(provider){
      this.supportedLanguages.forEach( function(value) {
            provider.translations(value, this[value]);
      }, this);

      provider.preferredLanguage(this.preferredLanguage);
    }
}
