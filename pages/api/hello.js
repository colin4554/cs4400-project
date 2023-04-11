// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {condition: "graves' disease", treatments: [{treatment: "aleve", dosage: "2 x 220mg"}, {treatment: "methimazole", dosage: '10 mg'}]},
    {condition: "food allergies", treatments: [{treatment: "antihistamine", dosage: "0.5"}]},
    {condition: "fibromyalgia", treatments: [{treatment: "imodium", dosage: "3 tablets"}, {treatment: "mobic", dosage: "1 pill"}]}
  ])
}
