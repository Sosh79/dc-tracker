"use client"
import { MdSearch } from "react-icons/md";
import styles from "./searchbar.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const SearchBar = ({ placeholder }) => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()
    const handleSearch = (e) => {

        const params = new URLSearchParams(searchParams)
        params.set("q", e.target.value)
        if (e.target.value) {
            e.target.value.length > 2 && params.set("q", e.target.value)
            params.set("q", e.target.value)
        } else {
            params.delete("q")
        }
        replace(`${pathname}?${params}`)
    }
    return (

        <div className={styles.container}>
            <MdSearch />
            <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch} />
        </div>

    )
}

export default SearchBar;