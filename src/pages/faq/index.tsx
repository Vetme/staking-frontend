import { Chevron } from "@/components/Icons";
import React, { useState } from "react";

const faqData = [
  {
    question: "What is VetMe Staking?",
    answer:
      "VetMe Staking is a feature on the VetMe platform that allows users to lock up VetMe tokens for a specific period in exchange for rewards.",
  },
  {
    question: "What is the staking period for VetMe Staking?",
    answer: "The staking period for VetMe Staking is 30 days.",
  },
  {
    question:
      "Can I stake any cryptocurrency, or is it limited to VetMe tokens?",
    answer: "You can only stake VetMe tokens on the VetMe Staking platform.",
  },
  {
    question: "When can I stake my VetMe tokens?",
    answer:
      "You have a three-day allowance period to stake your VetMe tokens after the staking pool opens.",
  },
  {
    question: "In what form are the staking rewards paid?",
    answer:
      "Staking rewards are paid in USDT (Tether), providing stability to your earnings.",
  },
  {
    question: "How are staking rewards calculated and distributed?",
    answer:
      "Staking rewards are shared based on your share in the total staking pool after the allowance period ends. The more VetMe tokens you stake, the larger your share of the rewards.",
  },
  {
    question: "Can I view the details of my stakes?",
    answer:
      "Yes, you can view the details of your stakes, including the amount staked and your current share of the staking pool.",
  },
  {
    question: "Is there an emergency withdrawal option, and how does it work?",
    answer:
      "Yes, there is an emergency withdrawal option. However, initiating an emergency withdrawal nullifies your eligibility to receive rewards from the staking pool. The emergency withdrawal process takes two days to complete.",
  },
  {
    question: "Where do the staking rewards come from?",
    answer:
      "Staking rewards come from the revenue generated across all VetMe platforms. Your participation in staking directly contributes to these rewards.",
  },
  {
    question: "How do I get started with VetMe Staking?",
    answer:
      "To begin staking your VetMe tokens, visit the VetMe Staking platform on VetMe's decentralized platform. Follow the provided instructions to start earning rewards.",
  },
  {
    question: "Is VetMe Staking subject to taxation?",
    answer:
      "Taxation regulations may vary depending on your jurisdiction. It's advisable to consult with a tax professional to understand the tax implications of your staking rewards.",
  },
  {
    question:
      "Is there a maximum limit to the number of VetMe tokens I can stake?",
    answer:
      "VetMe Staking does not have a specific upper limit, allowing you to stake as many VetMe tokens as you wish.",
  },
  {
    question: "What happens if I miss the staking allowance period?",
    answer:
      "If you miss the staking allowance period, you'll need to wait until the next staking pool opens in 30 days to participate.",
  },
  {
    question: "Are there any fees associated with VetMe Staking?",
    answer: "There are no fees apart from the gas fees.",
  },
];

const Faq = () => {
  return (
    <div className="container">
      <div className="faq-con">
        <div className="header">
          <h4>VetMe Staking FAQ</h4>
          <p>
            Here's a FAQ for VetMe Staking, a cryptocurrency revenue share
            staking platform:
          </p>
        </div>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}

        <div style={{ margin: "20px 0px" }}>
          <p>
            Remember that cryptocurrency staking involves risk, and it's
            important to carefully consider these details before participating
            in VetMe Staking.
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <div
        className={`faq-question ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        <span>{question}</span>
        <Chevron />
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

export default Faq;
