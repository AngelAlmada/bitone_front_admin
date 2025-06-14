import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { API_ROUTES } from "../routes/apiConfig";

interface DealerFormData {
  name: string;
  last_name: string;
  last_name2: string;
  phone: string;
  status: string;
  image?: File | null;
  existingImageUrl?: string | null;
}

const DealerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const userRole = sessionStorage.getItem("rol") || "";

  const [form, setForm] = useState<DealerFormData>({
    name: "",
    last_name: "",
    last_name2: "",
    phone: "",
    status: "",
    image: null,
    existingImageUrl: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch dealer data si hay id (modo edición)
  useEffect(() => {
    if (!id) return;

    const fetchDealerData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ROUTES.UPDATE_DEALER(id), {
          headers: {
            Authorization: userRole,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setForm({
          name: data.name || "",
          last_name: data.last_name || "",
          last_name2: data.last_name2 || "",
          phone: data.phone || "",
          status: data.status || "",
          image: null,
          existingImageUrl: data.imageUrl || null,
        });
        setPreviewImage(data.imageUrl || null);
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchDealerData();
  }, [id, userRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      
      // Crear vista previa de la nueva imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Validación básica de campos requeridos
    if (!form.name || !form.last_name || !form.phone) {
      setMessage("Todos los campos marcados como requeridos deben ser completados");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("last_name", form.last_name);
    formData.append("last_name2", form.last_name2 || "");
    formData.append("phone", form.phone);
    formData.append("status", "A");

    // Solo adjuntar imagen si se seleccionó una nueva
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const url = isEditMode 
        ? API_ROUTES.UPDATE_DEALER(id) 
        : API_ROUTES.LIST_DEALER;

      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: userRole,
          // No establecer Content-Type cuando se envía FormData,
          // el navegador lo establecerá automáticamente con el boundary correcto
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operación fallida");
      }

      // Redirigir con flag para refrescar la lista
      navigate("/dealerList", { state: { shouldRefresh: true } });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Error de conexión");
      console.error("Error al guardar dealer:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-blue-600 font-semibold">
          {isEditMode ? "Cargando datos del dealer..." : "Preparando formulario..."}
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <button
        onClick={() => navigate("/dealerList")}
        className="flex items-center text-blue-600 hover:text-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label="Volver a la lista de dealers"
      >
        <ChevronLeft size={24} />
        <span className="ml-1 font-semibold text-lg">Volver</span>
      </button>

      <h2 className="text-xl font-bold mb-4 text-center">
        {isEditMode ? "Actualizar Dealer" : "Registrar nuevo Dealer"}
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vista previa de la imagen */}
        <div className="flex flex-col items-center">
          {previewImage ? (
            <div className="mb-4 relative">
              <img 
                src={previewImage} 
                alt="Imagen del dealer" 
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
              <span className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {isEditMode && !form.image ? "Actual" : "Nueva"}
              </span>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
          
          <label className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-sm font-medium">
              {form.image ? "Cambiar imagen" : "Seleccionar imagen"}
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <small className="text-gray-500 text-sm mt-1">
            {isEditMode && !form.image ? "La imagen actual se mantendrá" : "Formatos: JPG, PNG"}
          </small>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Apellido Paterno*</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Apellido Materno</label>
            <input
              type="text"
              name="last_name2"
              value={form.last_name2}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Teléfono* (10 dígitos)</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isEditMode ? "Actualizar Dealer" : "Registrar Dealer"}
        </button>
      </form>
    </div>
  );
};

export default DealerForm;