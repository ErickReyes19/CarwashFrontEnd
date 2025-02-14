import { getClienteByIdView } from "../../actions";
import ClientInfoComponent from "../../components/clienteView";


export default async function ClientInfoPage({ params }: { params: { id: string } }) {
  const clientInfo = await getClienteByIdView(params.id);

  if (!clientInfo) {
    return (
      <div className="p-4">
        <p>No client information available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ClientInfoComponent clientInfo={clientInfo} />
    </div>
  );
}
