import Menubar from "../../../components/Menubar";
import AdForm from "../../../components/forms/AdForm";

export default function SellHouse() {
  return (
    <div className="container-fluid">
      
      <h1 className="display-1 bg-primary text-light p-5">Sell House</h1>
      <Menubar/>
      <div className="container mt-2">
        <AdForm action="Sell" type="House" />
      </div>
    </div>
  );
}
