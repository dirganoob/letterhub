import React, { useState, useRef } from "react";
import { Plus, Trash2, Save, Send, X } from "lucide-react";

// ══════════════════════════════════════
// ── REUSABLE FORM COMPONENTS ──
// ══════════════════════════════════════
const Section = ({ icon, title, children }) => (
    <div className="mb-8">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-4">
            <span className="text-lg">{icon}</span>
            {title}
        </h3>
        {children}
    </div>
);

const FieldRow = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{children}</div>
);

const Field = ({ label, placeholder, value, onChange, type = "text", disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${disabled
                    ? "bg-emerald-50/60 border-emerald-200/60 text-gray-700"
                    : "bg-[#F0FDF4] border-emerald-200/50 text-gray-700 placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
                }`}
        />
    </div>
);

const TextareaField = ({ label, placeholder, value, onChange, rows = 4 }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full px-4 py-3 rounded-xl bg-[#F0FDF4] border border-emerald-200/50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 transition-all resize-y"
        />
    </div>
);

const Divider = () => <div className="h-px bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent my-2" />;

// ══════════════════════════════════════
// ── LIVE PREVIEW COMPONENT ──
// ══════════════════════════════════════
const LivePreview = ({ form, signers, jadwal, ccList, files, formatDate }) => {
    const hasKepada = form.kepada || form.jabatanPenerima;
    const hasPerihal = form.perihal1 || form.perihal2;
    const hasJadwal = jadwal.some((j) => j.hari || j.waktu || j.tempat);
    const hasPIC = form.namaPIC;
    const hasCC = ccList.some((c) => c.nama);

    return (
        <div className="flex-[0.7] sticky top-20">
            <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm overflow-hidden">
                {/* Preview Header Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-emerald-50/50 border-b border-emerald-100/40">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">📄</span>
                        <span className="text-sm font-bold text-gray-700">Preview Surat</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-white px-2.5 py-1 rounded-full border border-emerald-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Preview
                    </span>
                </div>

                {/* ── Paper Preview ── */}
                <div className="p-4">
                    <div
                        className="bg-white rounded-lg shadow-md mx-auto overflow-y-auto"
                        style={{
                            maxHeight: "72vh",
                            fontFamily: "'Times New Roman', 'Georgia', serif",
                            fontSize: "11px",
                            lineHeight: "1.6",
                            color: "#1a1a1a",
                        }}
                    >
                        <div className="px-8 py-6">
                            {/* ══════ KOP SURAT ══════ */}
                            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                                {/* Company Name */}
                                <h1 style={{ fontSize: "22px", fontWeight: "bold", letterSpacing: "1px", marginBottom: "2px" }}>
                                    <span style={{ color: "#16A34A" }}>KALLA </span>
                                    <span style={{ color: "#DC2626" }}>TOYOTA</span>
                                </h1>
                                {/* PT Name */}
                                <p style={{ fontSize: "11px", fontWeight: "bold", marginBottom: "4px" }}>PT. Hadji Kalla</p>
                                {/* Address lines */}
                                <div style={{ fontSize: "9px", color: "#16A34A", lineHeight: "1.5" }}>
                                    <p>Wisma Kalla, Lt. 12</p>
                                    <p>Jl. Dr. Sam Ratulangi No 8-10</p>
                                    <p>Makassar 90132, Indonesia</p>
                                    <p>T (62 411) 870 000</p>
                                    <p>www.kallatoyota.co.id</p>
                                </div>
                            </div>

                            {/* ══════ NOMOR SURAT ══════ */}
                            <div className="mb-5" style={{ fontSize: "11px" }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "80px", verticalAlign: "top" }}>Nomor</td>
                                            <td style={{ verticalAlign: "top", paddingRight: "8px" }}>:</td>
                                            <td>{form.nomorSurat || "-"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* ══════ KEPADA ══════ */}
                            <div className="mb-4" style={{ fontSize: "11px" }}>
                                <p style={{ fontWeight: "bold" }}>Kepada Yth.</p>
                                {hasKepada ? (
                                    <>
                                        <p style={{ marginLeft: "16px" }}>-</p>
                                        <p style={{ textAlign: "center", fontWeight: "bold" }}>
                                            {form.kepada ? "─────────────" : "───────────────"}{" "}
                                            ({form.jabatanPenerima || "───────────────"})
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ marginLeft: "16px" }}>-</p>
                                        <p style={{ textAlign: "center" }}>─────────────── (───────────────)</p>
                                    </>
                                )}
                                <p>Di -</p>
                                <p style={{ marginLeft: "32px" }}>Tempat</p>
                            </div>

                            {/* ══════ DENGAN HORMAT ══════ */}
                            <div className="mb-4" style={{ fontSize: "11px" }}>
                                <p>Dengan hormat,</p>
                                <div className="my-3 border-b border-gray-300" />
                                {/* Perihal line */}
                                {hasPerihal && (
                                    <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "8px" }}>
                                        ───────────────
                                    </p>
                                )}
                            </div>

                            {/* ══════ SALAM PEMBUKA ══════ */}
                            <div className="mb-4" style={{ fontSize: "11px", textAlign: "justify" }}>
                                <p style={{ fontStyle: "italic", color: "#16A34A", marginBottom: "8px" }}>
                                    Assalamualaikum Warahmatullahi Wabarakatuh.
                                </p>
                                <p style={{ marginBottom: "8px" }}>
                                    Teriring salam dan doa semoga segala aktifitas kita senantiasa berjalan lancar dan mendapat perlindungan dan rahmat dari Allah Subhanahu Wata'ala. Aamiin.
                                </p>
                            </div>

                            {/* ══════ ISI SURAT ══════ */}
                            {form.paragrafPembuka && (
                                <div className="mb-4" style={{ fontSize: "11px", textAlign: "justify" }}>
                                    <p style={{ whiteSpace: "pre-wrap" }}>{form.paragrafPembuka}</p>
                                </div>
                            )}

                            {/* ══════ TABEL JADWAL ══════ */}
                            {hasJadwal && (
                                <div className="mb-4">
                                    <table
                                        className="w-full border-collapse"
                                        style={{ fontSize: "10px" }}
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ background: "#052E16", color: "white", padding: "6px 8px", fontWeight: "bold", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5px", border: "1px solid #052E16" }}>
                                                    No
                                                </th>
                                                <th style={{ background: "#052E16", color: "white", padding: "6px 8px", fontWeight: "bold", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5px", border: "1px solid #052E16" }}>
                                                    Hari/Tanggal
                                                </th>
                                                <th style={{ background: "#052E16", color: "white", padding: "6px 8px", fontWeight: "bold", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5px", border: "1px solid #052E16" }}>
                                                    Waktu
                                                </th>
                                                <th style={{ background: "#052E16", color: "white", padding: "6px 8px", fontWeight: "bold", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.5px", border: "1px solid #052E16" }}>
                                                    Tempat
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jadwal.filter((j) => j.hari || j.waktu || j.tempat).map((j, i) => (
                                                <tr key={i}>
                                                    <td style={{ border: "1px solid #d1d5db", padding: "6px 8px", textAlign: "center" }}>{i + 1}</td>
                                                    <td style={{ border: "1px solid #d1d5db", padding: "6px 8px" }}>{j.hari}</td>
                                                    <td style={{ border: "1px solid #d1d5db", padding: "6px 8px" }}>{j.waktu}</td>
                                                    <td style={{ border: "1px solid #d1d5db", padding: "6px 8px" }}>{j.tempat}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p style={{ fontSize: "10px", fontStyle: "italic", marginTop: "4px" }}>*schedule terlampir</p>
                                </div>
                            )}

                            {/* ══════ PIC INFO ══════ */}
                            {hasPIC && (
                                <div className="mb-4" style={{ fontSize: "11px", textAlign: "justify", color: "#16A34A" }}>
                                    <p>
                                        Untuk informasi lebih lanjut dapat menghubungi{" "}
                                        <strong style={{ color: "#1a1a1a" }}>{form.namaPIC}</strong>
                                        {form.noHPPIC && (
                                            <>
                                                {" "}<em>no hp</em>{" "}
                                                <strong style={{ color: "#1a1a1a" }}>{form.noHPPIC}</strong>
                                            </>
                                        )}
                                        {form.emailPIC && (
                                            <>
                                                {" "}<em>e-mail:</em>{" "}
                                                <strong style={{ color: "#1a1a1a" }}>{form.emailPIC}</strong>
                                            </>
                                        )}
                                    </p>
                                </div>
                            )}

                            {/* ══════ PENUTUP ══════ */}
                            <div className="mb-4" style={{ fontSize: "11px", textAlign: "justify" }}>
                                <p>Demikian undangan kami, atas perhatian dan kerjasamanya diucapkan terima kasih.</p>
                                <p style={{ fontStyle: "italic", color: "#16A34A", marginTop: "8px" }}>
                                    Wassalamualaikum Warahmatullahi Wabarakatuh.
                                </p>
                            </div>

                            {/* ══════ TTD / SIGNERS ══════ */}
                            {signers.length > 0 && (
                                <div className="mt-6" style={{ fontSize: "11px" }}>
                                    <p>{signers[0]?.lokasi || "Makassar"}, {formatDate(form.tanggalSurat)}</p>
                                    <p>Hormat kami,</p>

                                    <div className={`mt-1 ${signers.length > 1 ? "grid grid-cols-2 gap-4" : ""}`}>
                                        {signers.map((s, i) => (
                                            <div key={i} className="mt-2">
                                                {s.departemen && <p>{s.departemen}</p>}
                                                {/* Spacing for signature */}
                                                <div style={{ height: "60px" }} />
                                                {s.nama && (
                                                    <p style={{ fontWeight: "bold", textDecoration: "underline" }}>{s.nama}</p>
                                                )}
                                                {s.jabatan && <p>{s.jabatan}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ══════ CC BOX ══════ */}
                            {hasCC && (
                                <div
                                    className="mt-6"
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "6px",
                                        padding: "10px 14px",
                                        fontSize: "10px",
                                    }}
                                >
                                    <p style={{ fontWeight: "bold", marginBottom: "4px" }}>CC:</p>
                                    {ccList.filter((c) => c.nama).map((c, i) => (
                                        <p key={i} style={{ color: "#374151" }}>
                                            - {c.nama}{c.jabatan ? `  (${c.jabatan})` : ""}
                                        </p>
                                    ))}
                                    <p style={{ color: "#374151" }}>- Arsip</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ══════════════════════════════════════
// ── ADD LETTER PAGE ──
// ══════════════════════════════════════
const AddLetter = () => {
    const [form, setForm] = useState({
        nomorSurat: "0007/HCDC/HK-TOYOTA/I/2026",
        tanggalSurat: "2026-01-14",
        kepada: "",
        jabatanPenerima: "",
        perihal1: "",
        perihal2: "",
        paragrafPembuka: "",
        namaPIC: "",
        noHPPIC: "",
        emailPIC: "",
    });

    const [signers, setSigners] = useState([
        { departemen: "HC Development & Culture", lokasi: "Makassar", nama: "AZANDY ABDILLAH BULOTO", jabatan: "Manager" },
    ]);

    const [jadwal, setJadwal] = useState([{ hari: "", waktu: "", tempat: "" }]);
    const [ccList, setCcList] = useState([{ nama: "", jabatan: "" }]);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const updateForm = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

    const addSigner = () => setSigners((prev) => [...prev, { departemen: "", lokasi: "", nama: "", jabatan: "" }]);
    const removeSigner = (idx) => setSigners((prev) => prev.filter((_, i) => i !== idx));
    const updateSigner = (idx, key, val) => setSigners((prev) => prev.map((s, i) => (i === idx ? { ...s, [key]: val } : s)));

    const addJadwal = () => setJadwal((prev) => [...prev, { hari: "", waktu: "", tempat: "" }]);
    const removeJadwal = (idx) => setJadwal((prev) => prev.filter((_, i) => i !== idx));
    const updateJadwal = (idx, key, val) => setJadwal((prev) => prev.map((j, i) => (i === idx ? { ...j, [key]: val } : j)));

    const addCC = () => setCcList((prev) => [...prev, { nama: "", jabatan: "" }]);
    const removeCC = (idx) => setCcList((prev) => prev.filter((_, i) => i !== idx));
    const updateCC = (idx, key, val) => setCcList((prev) => prev.map((c, i) => (i === idx ? { ...c, [key]: val } : c)));

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer?.files || e.target?.files || []);
        setFiles((prev) => [...prev, ...droppedFiles]);
    };
    const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    };

    return (
        <div className="px-8 py-6 relative">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/15 blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Buat Surat Baru</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Isi form di kiri, preview surat akan muncul di kanan secara real-time</p>
                    </div>
                </div>

                {/* ── Two Column ── */}
                <div className="flex gap-6 items-start">
                    {/* ════════ LEFT: FORM ════════ */}
                    <div className="flex-[1.1] bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm">

                        {/* 1. Informasi Dasar */}
                        <Section icon="📋" title="Informasi Dasar">
                            <FieldRow>
                                <Field label="Nomor Surat (Otomatis)" value={form.nomorSurat} disabled onChange={() => { }} />
                                <Field label="Tanggal Surat" type="date" value={form.tanggalSurat} onChange={(e) => updateForm("tanggalSurat", e.target.value)} />
                            </FieldRow>
                        </Section>

                        <Divider />

                        {/* 2. Penerima */}
                        <Section icon="👤" title="Penerima Surat">
                            <FieldRow>
                                <Field label="Kepada (Nama)" placeholder="Contoh: Bp. Muh Ashadi Cangara" value={form.kepada} onChange={(e) => updateForm("kepada", e.target.value)} />
                                <Field label="Jabatan Penerima" placeholder="Contoh: General Affair & HSE Manager" value={form.jabatanPenerima} onChange={(e) => updateForm("jabatanPenerima", e.target.value)} />
                            </FieldRow>
                        </Section>

                        <Divider />

                        {/* 3. Perihal */}
                        <Section icon="📌" title="Perihal Surat">
                            <div className="mb-4">
                                <Field label="Perihal (Baris 1)" placeholder="Contoh: Permohonan Pemesanan Transportasi Pemateri" value={form.perihal1} onChange={(e) => updateForm("perihal1", e.target.value)} />
                            </div>
                            <Field label="Perihal (Baris 2) – Opsional" placeholder="Contoh: Training Skin Beauty & Grooming Handsome Class" value={form.perihal2} onChange={(e) => updateForm("perihal2", e.target.value)} />
                        </Section>

                        <Divider />

                        {/* 4. Isi Surat */}
                        <Section icon="📝" title="Isi Surat">
                            <TextareaField
                                label="Paragraf Pembuka"
                                placeholder="Sehubungan dengan adanya skema baru untuk Training Mandatory..."
                                value={form.paragrafPembuka}
                                onChange={(e) => updateForm("paragrafPembuka", e.target.value)}
                                rows={5}
                            />
                        </Section>

                        <Divider />

                        {/* 5. Tabel Jadwal */}
                        <Section icon="📅" title="Tabel Jadwal">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-2 text-left pl-2 w-10">No</th>
                                            <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-2 text-left">Hari/Tanggal</th>
                                            <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-2 text-left">Waktu</th>
                                            <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-2 text-left">Tempat</th>
                                            <th className="w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jadwal.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="py-1.5 pl-2 text-gray-400 font-medium">{idx + 1}</td>
                                                <td className="py-1.5 pr-2">
                                                    <input className="w-full px-3 py-2.5 rounded-lg bg-[#F0FDF4] border border-emerald-200/50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10" placeholder="Senin - Rabu, 02-04 Februari 2026" value={row.hari} onChange={(e) => updateJadwal(idx, "hari", e.target.value)} />
                                                </td>
                                                <td className="py-1.5 pr-2">
                                                    <input className="w-full px-3 py-2.5 rounded-lg bg-[#F0FDF4] border border-emerald-200/50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10" placeholder="09.00 - 17.00 wita" value={row.waktu} onChange={(e) => updateJadwal(idx, "waktu", e.target.value)} />
                                                </td>
                                                <td className="py-1.5 pr-2">
                                                    <input className="w-full px-3 py-2.5 rounded-lg bg-[#F0FDF4] border border-emerald-200/50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10" placeholder="LC Cokro Lt 2 Alphard Room" value={row.tempat} onChange={(e) => updateJadwal(idx, "tempat", e.target.value)} />
                                                </td>
                                                <td className="py-1.5">
                                                    {jadwal.length > 1 && (
                                                        <button onClick={() => removeJadwal(idx)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button onClick={addJadwal} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                                <Plus size={14} /> Tambah Baris
                            </button>
                        </Section>

                        <Divider />

                        {/* 6. Kontak PIC */}
                        <Section icon="📞" title="Kontak PIC">
                            <FieldRow>
                                <Field label="Nama PIC" placeholder="Bapak Bambang Suwito" value={form.namaPIC} onChange={(e) => updateForm("namaPIC", e.target.value)} />
                                <Field label="No HP PIC" placeholder="081342451425" value={form.noHPPIC} onChange={(e) => updateForm("noHPPIC", e.target.value)} />
                            </FieldRow>
                            <Field label="Email PIC" placeholder="hc.development-culture.toyota@kalla.co.id" value={form.emailPIC} onChange={(e) => updateForm("emailPIC", e.target.value)} />
                        </Section>

                        <Divider />

                        {/* 7. Penandatangan (MULTIPLE) */}
                        <Section icon="✍️" title="Penandatangan">
                            <p className="text-xs text-gray-400 mb-4">Bisa menambahkan lebih dari satu penandatangan</p>
                            {signers.map((signer, idx) => (
                                <div key={idx} className="relative mb-5 p-4 rounded-xl bg-emerald-50/30 border border-emerald-100/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">Penandatangan {idx + 1}</span>
                                        {signers.length > 1 && (
                                            <button onClick={() => removeSigner(idx)} className="w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <FieldRow>
                                        <Field label="Departemen" placeholder="HC Development & Culture" value={signer.departemen} onChange={(e) => updateSigner(idx, "departemen", e.target.value)} />
                                        <Field label="Lokasi" placeholder="Makassar" value={signer.lokasi} onChange={(e) => updateSigner(idx, "lokasi", e.target.value)} />
                                    </FieldRow>
                                    <FieldRow>
                                        <Field label="Nama Penandatangan" placeholder="AZANDY ABDILLAH BULOTO" value={signer.nama} onChange={(e) => updateSigner(idx, "nama", e.target.value)} />
                                        <Field label="Jabatan" placeholder="Manager" value={signer.jabatan} onChange={(e) => updateSigner(idx, "jabatan", e.target.value)} />
                                    </FieldRow>
                                </div>
                            ))}
                            <button onClick={addSigner} className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                                <Plus size={14} /> Tambah Penandatangan
                            </button>
                        </Section>

                        <Divider />

                        {/* 8. Tembusan CC */}
                        <Section icon="📋" title="Tembusan (CC)">
                            {ccList.map((cc, idx) => (
                                <div key={idx} className="flex items-start gap-3 mb-3">
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <input className="w-full px-4 py-3 rounded-xl bg-[#F0FDF4] border border-emerald-200/50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10" placeholder="Nama (Bp Robby Wijaya)" value={cc.nama} onChange={(e) => updateCC(idx, "nama", e.target.value)} />
                                        <input className="w-full px-4 py-3 rounded-xl bg-[#F0FDF4] border border-emerald-200/50 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10" placeholder="Jabatan (CEO Kalla Toyota)" value={cc.jabatan} onChange={(e) => updateCC(idx, "jabatan", e.target.value)} />
                                    </div>
                                    {ccList.length > 1 && (
                                        <button onClick={() => removeCC(idx)} className="mt-2 w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={addCC} className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                                <Plus size={14} /> Tambah CC
                            </button>
                        </Section>

                        <Divider />

                        {/* 9. Lampiran */}
                        <Section icon="📎" title="Lampiran">
                            <div
                                className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleFileDrop}
                            >
                                <div className="text-3xl mb-2">📁</div>
                                <p className="text-sm font-medium text-emerald-600">Klik atau drag file ke sini</p>
                                <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLSX, JPG — Max 10MB</p>
                                <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.xlsx,.jpg,.jpeg,.png" className="hidden" onChange={handleFileDrop} />
                            </div>
                            {files.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">📄</span>
                                                <span className="text-sm text-gray-700 font-medium">{file.name}</span>
                                                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</span>
                                            </div>
                                            <button onClick={() => removeFile(idx)} className="text-gray-300 hover:text-red-500 transition-colors"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Section>

                        {/* ── Action Buttons ── */}
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                                <Save size={16} /> Simpan Draft
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 transition-all">
                                <Send size={16} /> Kirim untuk Approval
                            </button>
                        </div>
                    </div>

                    {/* ════════ RIGHT: LIVE PREVIEW ════════ */}
                    <LivePreview
                        form={form}
                        signers={signers}
                        jadwal={jadwal}
                        ccList={ccList}
                        files={files}
                        formatDate={formatDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddLetter;