import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListNav.css";

const countNotesForFolder = (notes = [], folderId) =>
  notes.filter((note) => note.folderId === folderId).length;

export default function NoteListNav(props) {
  return (
    <div className="NoteListNav">
      <ul className="NoteListNav_list">
        {props.folders.map((folder) => (
          <li key={folder.id}>
            <NavLink
              className="NoteListNav__folder-link"
              to={`/folder/${folder.id}`}
            >
              <span className="NoteListNav__num-notes">
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="NoteListNav__button-wrapper">
        <CircleButton
          tag={Link}
          to="/add-folder"
          type="button"
          className="NoteListNav__add-folder-button"
        >
          <FontAwesomeIcon icon="plus" />
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
  );
}
