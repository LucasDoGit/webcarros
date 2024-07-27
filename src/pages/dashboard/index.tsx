import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { DashboradHeader } from '../../components/panelheader'
import { FiTrash2 } from "react-icons/fi";

import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    images: CarImageProps[];
}

interface CarImageProps {
    name: string;
    uid: string;
    url: string;
}

export function Dashboard() {
    const [cars, setCars] = useState<CarProps[]>([])
    const { user } = useContext(AuthContext)
    const [loadImages, setLoadImages] = useState<string[]>([])

    useEffect(() => {

        function loadCars() {
            if(!user?.uid){
                return;
            }
            const carsRef = collection(db, "cars")
            const queryRef = query(carsRef, where("uid", "==", user.uid))

            getDocs(queryRef)
                .then((snapshot) => {
                    let listcars = [] as CarProps[];

                    snapshot.forEach(doc => {
                        listcars.push({
                            id: doc.id,
                            name: doc.data().name,
                            year: doc.data().year,
                            km: doc.data().km,
                            city: doc.data().city,
                            price: doc.data().price,
                            images: doc.data().images,
                            uid: doc.data().uid
                        })
                    })

                    setCars(listcars)
                })
                .catch((err) => {
                    console.log("Erro ao buscar carros", err)
                })
        }

        loadCars();
    })

    return (
        <Container>
            <DashboradHeader/>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            <section className="w-full bg-white rounded-lg relative">
                <button 
                className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
                onClick={ () => {}}
                >
                    <FiTrash2 size={26} color="#000"/>
                </button>
                <img 
                    className="w-full rounded-lg mb-2 max-h-70" 
                    alt="Carro"
                    src="https://firebasestorage.googleapis.com/v0/b/webcarros-d1d40.appspot.com/o/images%2Fm0tQppbWMTXFAw5sgB4ZcDIu1B42%2F071e526d-900a-4f3d-b6d8-5825eb9d0832?alt=media&token=7220d286-569e-402c-8450-873303fd9f16" 
                />
                <p className="font-bold mt-1 px-2 mb-2">Nissa Versa</p>

                <div className="flex flex-col px-2">
                    <span className="flex flex-col px-2"> 
                        Ano 2016/2016 | 230.000 km
                    </span>
                    <strong className="text-black font-bold mt-4">
                        R$ 150.000
                    </strong>
                </div>

                <div className="w-full h-px bg-slate-200 my-2"></div>
                <div className="px-2 pb-2">
                    <span className="text-black">
                        Campo Grande - MS
                    </span>
                </div>

            </section>
        </main>

        </Container>
    )
}

