import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TourStep {
  title: string;
  description: string;
  highlight: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  tooltip: {
    top: string;
    left: string;
  };
}

const tourSteps: TourStep[] = [
  {
    title: "Trade Card",
    description: "View complete trade details including price, amount, and payment method.",
    highlight: {
      top: '140px',
      left: '285px',
      width: '440px',
      height: '300px'
    },
    tooltip: {
      top: '450px',
      left: '285px'
    }
  },
  {
    title: "Smart Filters",
    description: "Narrow down offers by payment method, amount, location, and trader reputation.",
    highlight: {
      top: '190px',
      left: '24px',
      width: '260px',
      height: '520px'
    },
    tooltip: {
      top: '130px',
      left: '300px'
    }
  },
  {
    title: "Trade Type & Trader",
    description: "See if it's a buy or sell offer and check the trader's reputation.",
    highlight: {
      top: '160px',
      left: '285px',
      width: '440px',
      height: '55px'
    },
    tooltip: {
      top: '225px',
      left: '285px'
    }
  },
  {
    title: "Trade Details",
    description: "Check the amount, price, payment method, and location.",
    highlight: {
      top: '215px',
      left: '285px',
      width: '440px',
      height: '140px'
    },
    tooltip: {
      top: '365px',
      left: '285px'
    }
  },
  {
    title: "Action Button",
    description: "Click here to view full details and start trading.",
    highlight: {
      top: '370px',
      left: '285px',
      width: '440px',
      height: '45px'
    },
    tooltip: {
      top: '425px',
      left: '285px'
    }
  },
  {
    title: "Cryptocurrency Selection",
    description: "Choose which cryptocurrency you want to trade. We support BTC, ETH, and USDT.",
    highlight: {
      top: '200px',
      left: '40px',
      width: '230px',
      height: '50px'
    },
    tooltip: {
      top: '260px',
      left: '300px'
    }
  },
  {
    title: "Payment Methods",
    description: "Select your preferred payment method for the trade.",
    highlight: {
      top: '280px',
      left: '40px',
      width: '230px',
      height: '50px'
    },
    tooltip: {
      top: '340px',
      left: '300px'
    }
  },
  {
    title: "Amount Range",
    description: "Specify how much you want to trade.",
    highlight: {
      top: '360px',
      left: '40px',
      width: '230px',
      height: '80px'
    },
    tooltip: {
      top: '420px',
      left: '300px'
    }
  },
  {
    title: "Location Filters",
    description: "Filter trades by offer location and trader location to find local trades.",
    highlight: {
      top: '460px',
      left: '40px',
      width: '230px',
      height: '100px'
    },
    tooltip: {
      top: '520px',
      left: '300px'
    }
  }
];

export function TradesTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-white text-black hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        Take Tour
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />
          
          {/* Highlight container */}
          <div
            className="absolute bg-transparent"
            style={{
              ...tourSteps[currentStep].highlight,
              pointerEvents: 'none'
            }}
          >
            {/* Bright area */}
            <div 
              className="absolute inset-0 border border-[#22C55E] rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'brightness(1.2)',
                boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.2)'
              }}
            />
          </div>

          {/* Tooltip */}
          <div
            className="absolute bg-white p-6 rounded-lg shadow-xl w-[300px]"
            style={tourSteps[currentStep].tooltip}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {tourSteps[currentStep].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {tourSteps[currentStep].description}
            </p>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip Tour
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep ? 'bg-[#22C55E]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleNext}
                  className="bg-[#22C55E] text-white hover:bg-[#1ea550]"
                >
                  {currentStep === tourSteps.length - 1 ? 'Got it' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
