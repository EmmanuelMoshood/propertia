import Menubar from "../../../components/Menubar";
import AdForm from "../../../components/forms/AdForm";

export default function RentHouse() {
  return (
    <div className="contaienr-fluid">
      <h1 className="display-1 bg-primary text-light p-5">Rent House</h1>
      <Menubar/>

      <div className="container mt-2">
        <AdForm action="Rent" type="House" />
      </div>
    </div>
  );
}
