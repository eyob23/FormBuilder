const data = {
  firstName: "smith",
  lastName: "Joe",
  sex: "male",
  description: "initial Description",
  food: ["salad", "pasta"],
  color: "red",
  detialDescription: "This is more information",
  fullName: {
    firstName: "object first name",
    lastName: "object last name"
  },
  nested: [
    {
      firstName: "smith nested",
      lastName: "Joe nested",
      sex: "male",
      description: "initial Description  nested",
      food: ["salad", "pasta"],
      color: "red",
      detialDescription: "This is more information  nested",
      fullName: {
        firstName: "object first name",
        lastName: "object last name"
      },
      nested2: [
        {
          firstName: "smith nested2",
          lastName: "Joe nested2",
          sex: "male",
          description: "initial Description  nested2",
          food: ["salad", "pasta"],
          color: "blue",
          detialDescription: "This is more information  nested2",
          fullName: {
            firstName: "object first name",
            lastName: "object last name"
          }
        }
      ]
    }
  ]
};
const get = async () => {
  return await new Promise(function (resolve) {
    setTimeout(data, 500);
  });
};
export default get;
