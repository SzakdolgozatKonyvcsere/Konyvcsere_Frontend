import BookTableAdmin from "../components/AdminTables/BookTableAdmin";
import useApiContext from "../contexts/ApiContext";

export default function BooksTableAdminPage(){
    const {bookLista}=useApiContext();

    return(
        <main>
            <h1>Táblázat Összes Könyv - Admin</h1>
            <div>
                <BookTableAdmin books={bookLista}/>
            </div>
        </main>
    )
}