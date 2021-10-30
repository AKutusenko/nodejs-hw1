const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.green("Contact found success"));
          console.log(contactById);
        } else {
          console.log(chalk.yellow("Contact not found"));
        }
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.green("New contact added"));
        console.log(contact);
        break;

      case "remove":
        const newContacts = await removeContact(id);
        console.log(chalk.green("Contact has been deleted"));
        console.table(newContacts);
        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (error) {
    console.error(chalk.red(error.message));
  }
})(argv);
