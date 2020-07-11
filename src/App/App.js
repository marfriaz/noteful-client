import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import "./App.css";

const findNote = (notes = [], noteId) =>
  notes.find((note) => note.id === noteId);

const findFolder = (folders = [], folderId) =>
  folders.find((folder) => folder.id === folderId);

export const getNotesForFolder = (notes = [], folderId) =>
  !folderId ? notes : notes.filter((note) => note.folderId === folderId);

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            path={path}
            render={(routeProps) => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);

            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />

        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route
            exact
            path={path}
            render={(routeProps) => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={(routeProps) => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}