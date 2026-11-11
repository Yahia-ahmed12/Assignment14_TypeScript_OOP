/*
=========================================================
Part B: Identify Relationships (UML Diagram Map)
=========================================================

1. Inheritance:
   - Between: Admin and User.
   - Diagram: A solid line with a hollow triangle pointing from Admin to User.
   - Code: `class Admin extends User`

2. Composition:
   - Between: NoteBook and Note.
   - Diagram: A solid line with a filled diamond at the NoteBook end.
   - Code: The `NoteBook` creates the `Note` internally using `new Note(...)` inside its `addNote` method.

3. Aggregation :
   - Between: User and NoteBook.
   - Diagram: A solid line with a hollow diamond at the User end.
   - Code: The `User` receives an already created `NoteBook` object from the outside via the `addNotebook` method.

4. Association :
   - Between: Note and User.
   - Diagram: A solid line with an open arrow pointing from Note to User.
   - Code: The `Note` constructor accepts a reference to its author (`public author: User`).
=========================================================
*/

class User {
  public notebooks: NoteBook[] = [];

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    public phone: string,
    private _age: number,
  ) {
    this.setAge(_age);
  }

  public setAge(newAge: number): void {
    if (newAge >= 18 && newAge <= 60) {
      this._age = newAge;
    } else {
      console.error(
        `❌ Error: Age "${newAge}" is invalid for user "${this.name}". It must be between 18 and 60.`,
      );
    }
  }

  public getAge(): number {
    return this._age;
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
    console.log(`📔 Notebook added to ${this.name}'s collection.`);
  }

  public displayInfo(): void {
    console.log(`
      === User Information ===
      ID       : ${this.id}
      Name     : ${this.name}
      Email    : ${this.email}
      Phone    : ${this.phone}
      Age      : ${this._age}
      Notebooks: ${this.notebooks.length}
      
    `);
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(
    action: "create" | "update" | "delete",
    noteContent: string,
  ): void {
    console.log(`
      🛠️  [Admin Action Required]
      Admin Name : ${this.name}
      Action     : ${action.toUpperCase()}
      Note       : "${noteContent}"
      Status     : Successfully Executed!
    `);
  }

  public displayInfo(): void {
    console.log(`\n👑 --- ADMIN PROFILE --- 👑`);
    super.displayInfo();
  }
}

class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public user: User,
  ) {}

  public preview(): string {
    const previewLength = 30;

    if (this.content.length > previewLength) {
      return this.content.substring(0, previewLength) + "...";
    }

    return this.content;
  }
}
class NoteBook {
  private notes: Note[] = [];

  constructor(public owner: User) {}

  public addNote(id: number, title: string, content: string): void {
    const newNote = new Note(id, title, content, this.owner);

    this.notes.push(newNote);
    console.log(`✅ Note added successfully: "${newNote.title}"`);
  }

  public removeNote(noteId: number): void {
    const initialLength = this.notes.length;

    this.notes = this.notes.filter((note) => note.id !== noteId);

    if (this.notes.length < initialLength) {
      console.log(`🗑️ Note with ID ${noteId} has been removed.`);
    } else {
      console.log(`❌ Note with ID ${noteId} not found.`);
    }
  }

  public displayAllNotes(): void {
    console.log(`\n📚 --- ${this.owner.name}'s NoteBook --- 📚`);
    if (this.notes.length === 0) {
      console.log("Notebook is empty.");
      return;
    }

    this.notes.forEach((note) => {
      console.log(`- [ID: ${note.id}] ${note.title}: ${note.preview()}`);
    });
    console.log(`-------------------------------\n`);
  }
}
class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
    console.log(`✅ Item added to storage.`);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);

    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`🗑️ Item removed from storage.`);
    } else {
      console.log(`❌ Item not found in storage.`);
    }
  }

  public getAllItems(): T[] {
    return this.items;
  }
}
console.log("\n--- Testing String Storage ---");
const stringStorage = new Storage<string>();
stringStorage.addItem("First Note");
stringStorage.addItem("Second Note");
stringStorage.removeItem("First Note");
console.log("All Strings:", stringStorage.getAllItems());

console.log("\n--- Testing Number Storage ---");
const numberStorage = new Storage<number>();
numberStorage.addItem(100);
numberStorage.addItem(200);
console.log("All Numbers:", numberStorage.getAllItems());

console.log("\n--- Testing Object Storage (User) ---");
const userStorage = new Storage<User>();
const user3 = new User(
  3,
  "Ali",
  "ali@example.com",
  "Pass789",
  "01200000000",
  22,
);
userStorage.addItem(user3);
console.log("All Users:", userStorage.getAllItems());
