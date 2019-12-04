import { Component, OnInit } from '@angular/core';
import { AccessUserService } from '../service/access-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from './note';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  decoded;
  selectEdit: boolean
  selectNew: boolean

  formNote: FormGroup;
  formEditNote: FormGroup;
  constructor(private serv: AccessUserService, private fb: FormBuilder) {
    this.formNote = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      color: ['', [Validators.required]],
      favorite: ['', [Validators.required]],

    })

  }

  ngOnInit() {
    this.selectNew = true;
    this.decoded = this.serv.currentUser();
    this.listNote()
  }
  logout() {
    this.serv.logOut();
  }
  notes: Note[];
  listNote() {
    this.serv.Notes().subscribe(res => {
      this.notes = res.resultat;
      console.log(this.notes)
    })
  }

  ajouterNote() {
    if (this.formNote.valid) {
      this.serv.newNote(this.formNote.value).subscribe(res => {

        this.notes.push(res.resultat);

      })
    }
  }
  id;
  note: Note;
  editNote(note) {
    this.note = note;
    this.id = note._id
    this.formEditNote = this.fb.group({
      title: [note.title, [Validators.required]],
      body: [note.body, [Validators.required]],
      color: [note.color, [Validators.required]],
      favorite: [note.favorite, [Validators.required]],

    })
    this.selectEdit = true;
    this.selectNew = false;


  }
  saveNote() {
    if (this.formNote.valid) {
      this.serv.saveNote(this.formEditNote.value, this.id).subscribe(res => {
        if (res.status == true) {
          const itemIndex = this.notes.findIndex(el => el === this.note);
          this.notes.splice(itemIndex, 1);
          this.notes.push(res.resultat);
          console.log(res)
          this.selectEdit = false;
          this.selectNew = true;
        }
      })
    }
  }

  quitterTodo() {
    this.serv.logOut()
  }
}
