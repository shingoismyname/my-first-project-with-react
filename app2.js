import React, { useState, useEffect } from 'react';


function App2() {
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi notes thay đổi
  useEffect(() => {
    if (notes.length > 10) {
      setNotes([]); // Xóa tất cả ghi chú nếu số lượng lớn hơn 10
    } else {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);



  const addnewdiv = () => {
    const newdiv2 = {
      value1: "",
      value2: "",
      isDisabled: false,
    };
    setNotes([...notes, { newdiv2 }]);
    setCount(count + 1);
  };

  const removeall = () => {
    setNotes([]);
    setCount(0);
  };

  const dealwithchange1 = (index, event) => {
    const updatedNotes = notes.map((note, i) =>
      i === index
        ? {
            ...note,
            newdiv2: {
              ...note.newdiv2,
              value1: event,
            },
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const dealwithchange2 = (index, event) => {
    const updatedNotes = notes.map((note, i) =>
      i === index
        ? {
            ...note,
            newdiv2: {
              ...note.newdiv2,
              value2: event,
            },
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const finished = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index
        ? {
            ...note,
            newdiv2: {
              ...note.newdiv2,
              isDisabled: true,
            },
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const actionedit = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index
        ? {
            ...note,
            newdiv2: {
              ...note.newdiv2,
              isDisabled: false,
            },
          }
        : note
    );
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className="editzone">
        <div className="edit">
          <button className="addnote" onClick={addnewdiv}>Thêm ghi chú</button>
          <button className="removeall" onClick={removeall}>xóa tất cả</button>
        </div>
        <div>
          {notes.map((note, index) => (
            <div className="notezone" key={index}>
              <ul className="notelist">
                <li className="section">
                  <div className="contentzone">
                    <div className="header">
                      <div>header</div>
                      <input
                        type="text"
                        onChange={(e) => dealwithchange1(index, e.target.value)}
                        value={note.newdiv2.value1 || ""}
                        disabled={note.newdiv2.isDisabled || false}
                      />
                    </div>
                    <div className="content">
                      <div>content</div>
                      <input
                        type="text"
                        onChange={(e) => dealwithchange2(index, e.target.value)}
                        value={note.newdiv2.value2 || ""}
                        disabled={note.newdiv2.isDisabled || false}
                      />
                    </div>
                  </div>
                  <div>
                    <button onClick={() => finished(index)}>finish</button>
                    <button onClick={() => actionedit(index)}>edit</button>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App2;
