const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const chalk = require("chalk");

const PATH = path.join(__dirname, "db/contacts.json");

const readData = async () => {
  const result = await fs.readFile(PATH, "utf-8");
  return JSON.parse(result);
};
const writeData = async (data) => {
  const result = await fs.writeFile(PATH, JSON.stringify(data, null, 2));
  return JSON.stringify(result);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const result = contacts.find((contact) => contact.id == contactId);
  return result;
};

const removeContact = async (contactId) => {
  if (!contactId) {
    console.log(chalk.red("Please enter an id"));
    return "";
  }

  const contacts = await readData();
  const idx = contacts.findIndex((item) => item.id == contactId);
  if (idx === -1) {
    console.log(chalk.red(`Id ${contactId} is not found`));
    return "";
  }

  contacts.splice(idx, 1);
  await writeData(contacts);
  console.log(chalk.green("Contact has been deleted"));
  return contacts;
};

const addContact = async (name, email, phone) => {
  if (!name && !email && !phone) {
    console.log(chalk.red("Please enter a name, phone number and email"));
    return "";
  }

  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeData(contacts);
  console.log(chalk.green("New contact added"));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
