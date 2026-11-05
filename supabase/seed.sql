-- ============================================================================
-- CleanHome Demonstration Seed Data (Rupiah Pricing Indonesia)
-- File: supabase/seed.sql
-- Description: Layanan kebersihan CleanHome dengan standar tarif Indonesia.
-- ============================================================================

INSERT INTO public.services (id, name, slug, description, price, image_url, category, duration_minutes, is_active)
VALUES
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7901',
        'Pembersihan Rumah Standar',
        'general-home-cleaning',
        'Pembersihan menyeluruh seluruh ruangan: menyapu, mengepel lantai, pembersihan debu perabot, sanitasi permukaan sering disentuh, dan pembuangan sampah. Tarif standar Rp 75.000 per jam.',
        150000.00,
        '/assets/aistudio/Pembersihan_Rumah_Standar_b062651e.jpg',
        'residential',
        120,
        true
    ),
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7902',
        'Pembersihan Dapur Intensif',
        'deep-kitchen-cleaning',
        'Pembersihan kerak minyak kompor, saringan exhaust hood, dinding keramik backsplash, sterilisasi bak cuci piring, dan lap kabinet luar. Tarif Rp 85.000 per jam.',
        170000.00,
        '/assets/aistudio/Pembersihan_Dapur_Intensif_e446e6a3.jpg',
        'specialized',
        120,
        true
    ),
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7903',
        'Sanitasi & Kerak Kamar Mandi',
        'bathroom-sanitization',
        'Pembersihan nat lantai dan dinding keramik, pengikisan kerak air dan sabun pada kaca shower, disinfeksi kloset standar higienis, serta pemolesan cermin dan keran. Tarif Rp 90.000 per jam.',
        180000.00,
        '/assets/aistudio/Sanitasi___Kerak_Kamar_Mand_eab80223.jpg',
        'specialized',
        120,
        true
    ),
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7904',
        'Kamar Tidur & Pergantian Sprei',
        'bedroom-linen-refresh',
        'Vakum kasur untuk pengurangan tungau debu, perapian dan pergantian sprei bersih, pembersihan kolong ranjang, lap lemari pakaian, dan penyegaran udara kamar. Tarif Rp 65.000 per jam.',
        130000.00,
        '/assets/aistudio/Kamar_Tidur___Pergantian_Sprei_7f1894f7.jpg',
        'residential',
        120,
        true
    ),
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7905',
        'Ruang Keluarga & Perawatan Sofa',
        'living-room-carpet-care',
        'Pembersihan serat sofa kain dan karpet menggunakan vakum berkekuatan tinggi, pengelapan kabinet TV dan rak buku, pembersihan sudut plin lantai, dan aromaterapi alami. Tarif Rp 80.000 per jam.',
        160000.00,
        '/assets/aistudio/Ruang_Keluarga___Perawatan_Sofa_599341be.jpg',
        'residential',
        120,
        true
    ),
    (
        'c1e48342-990a-40a2-9fa9-6f10d65b7906',
        'Deep Cleaning Menyeluruh (Paket Borongan)',
        'full-move-in-deep-cleaning',
        'Pembersihan total pasca renovasi atau persiapan pindah hunian. Mencakup detail rel jendela, ventilasi, bagian dalam lemari kosong, noda cat/semen halus, dan disinfeksi total. Paket borongan mulai Rp 25.000 per meter persegi atau paket borongan hunian.',
        1250000.00,
        '/assets/aistudio/Deep_Cleaning_Menyeluruh_6f358856.jpg',
        'deep-cleaning',
        240,
        true
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    duration_minutes = EXCLUDED.duration_minutes,
    is_active = EXCLUDED.is_active;
