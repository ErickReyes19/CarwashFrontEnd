import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    registro: any; // Aquí puedes pasar los datos necesarios del registro
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    registro,
}) => {
    const totalGeneral = registro.vehiculos.flatMap((v: any) => v.servicios).reduce((sum: number, s: any) => sum + s.precio, 0);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: '0', padding: '0' }}>
            <div style={{ padding: '20px 30px', backgroundColor: '#f9f9f9' }}>
                {/* Encabezado */}
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Factura de Servicio</h1>
                        <p style={{ fontSize: '12px', color: '#777' }}>
                            <strong>ID:</strong> {registro.id}
                        </p>
                        <p style={{ fontSize: '12px', color: '#777' }}>
                            <strong>Fecha:</strong> {new Date(registro.fecha).toLocaleDateString()}
                        </p>
                    </div>
                    <img src="public/images/logo.png" alt="Logo" style={{ width: '60px', height: '60px' }} />
                </div>

                {/* Cliente */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Cliente</h3>
                    <p style={{ fontSize: '11px', color: '#555' }}>
                        {registro.cliente.nombre} {registro.cliente.apellido}
                    </p>
                    <p style={{ fontSize: '11px', color: '#555' }}>{registro.cliente.correo}</p>
                </div>

                {/* Tabla de servicios */}
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '15px', paddingBottom: '5px', marginBottom: '8px', borderBottom: '1px solid #e0e0e0' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#666' }}>Descripción</div>
                        <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#666', textAlign: 'right' }}>Precio</div>
                    </div>
                    {registro.vehiculos.map((vehiculo: any) => (
                        <div key={vehiculo.id}>
                            <div style={{ backgroundColor: '#fafafa', padding: '6px 10px', marginBottom: '8px' }}>
                                <div style={{ fontWeight: 'bold', color: '#333' }}>
                                    {vehiculo.vehiculo.marca} {vehiculo.vehiculo.modelo}
                                </div>
                            </div>
                            {vehiculo.servicios.map((servicio: any) => (
                                <div key={servicio.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '15px', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <div style={{ fontSize: '11px', color: '#444' }}>{servicio.servicioNombre}</div>
                                    <div style={{ fontSize: '11px', color: '#444', textAlign: 'right' }}>
                                        HNL {servicio.precio.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '15px', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Total General:</div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#4a5568', textAlign: 'right' }}>
                        HNL {totalGeneral.toFixed(2)}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', color: '#888888', fontSize: '9px', borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginTop: '20px' }}>
                    <p>Gracias por su confianza. Si tiene alguna pregunta, no dude en contactarnos.</p>
                </div>
            </div>
        </div>
    );
};
