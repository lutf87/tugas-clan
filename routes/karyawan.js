const express = require('express')
const router = express.Router()

// impor db
const conn = require('../lib/db')

/**
 * Index Kar
 */
router.get('/', function(req, res, next){
    conn.query('SELECT * FROM karyawan ORDER BY id asc', function(err, rows){
        if(err){
            req.flash('error', err)
            res.render('karyawan', {
                data: ''
            })
        } else{
            res.render('kar/index', {
                data: rows
            })
        }
    })
})

/**
 * Create Kar
 */
router.get('/create', function(req, res, next){
    res.render('kar/create', {
        nama: '',
        phone: '',
        alamat: ''
    })
})

/**
 * Store Kar
 */
router.post('/store', function(req, res, next){
    let nama = req.body.nama
    let phone = req.body.phone
    let alamat = req.body.alamat
    let err = false

    if(nama.length===0){
        err = true
        req.flash('error', "Nama Kar Wajib Diisi")
        res.render('kar/create', {
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(phone.length===0){
        err = true;
        req.flash('error', "No Hp Kar Wajib Diisi")
        res.render('kar/create', {
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(alamat.length===0){
        err = true;
        req.flash('error', "Alamat Kar Wajib Diisi")
        res.render('kar/create', {
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(!err){
        let formData ={
            nama: nama,
            phone: phone,
            alamat: alamat
        }

        // insert
        conn.query('INSERT INTO karyawan SET ?', formData, function(err, result){
            if(err){
                req.flash('error', err)
                res.render('kar.create',{
                    nama: formData.nama,
                    phone: formData.phone,
                    alamat: formData.alamat
                })
            }else{
                req.flash('success', 'Data Kar Berhasil Disimpan!')
                res.redirect('/karyawan')
            }
        })
    }
})

/**
 * Edit Kar
 */
router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;
    conn.query('SELECT * FROM karyawan WHERE id = '+id, function(err, rows, fields){
        if(err) throw err
        if(rows.length<=0){
            req.flash('error', 'Data Post Dengan ID '+id+'Tidak Ditemukan')
            res.redirect('/karyawan')
        }else{
            res.render('kar/edit',{
                id:rows[0].id,
                nama:rows[0].nama,
                phone:rows[0].phone,
                alamat:rows[0].alamat
            })
        }
    })
})

/**
 * Update Kar
 */
router.post('/update/(:id)', function(req, res, next){
    let id = req.params.id
    let nama = req.body.nama
    let phone = req.body.phone
    let alamat = req.body.alamat
    let err = false;

    if(nama.length===0){
        err = true
        req.flash('error', "Nama Kar Wajib Diisi")
        res.render('kar/edit', {
            id:req.params.id,
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(phone.length===0){
        err = true;
        req.flash('error', "No Hp Kar Wajib Diisi")
        res.render('kar/edit', {
            id:req.params.id,
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(alamat.length===0){
        err = true;
        req.flash('error', "Alamat Kar Wajib Diisi")
        res.render('kar/edit', {
            id:req.params.id,
            nama: nama,
            phone: phone,
            alamat: alamat,
        })
    }

    if(!err){
        let formData={
            nama:nama,
            phone:phone,
            alamat:alamat
        }
        // update
        conn.query('UPDATE karyawan SET ? WHERE id = '+id, formData, function(err, result){
            if(err){
                req.flash('error', 'err')
                res.render('kar/edit',{
                    id:req.params.id,
                    nama:formData.nama,
                    phone:formData.phone,
                    alamat:formData.alamat
                })
            }else{
                req.flash('success', 'Data Berhasil Diupdate!')
                res.redirect('/karyawan')
            }
        })
    }
})

/**
 * Delete Kar
 */
router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id


    conn.query('DELETE FROM karyawan WHERE id = '+id, function(err, result){
        if(err){
            req.flash('error', err)
            res.redirect('/karyawan')
        } else{
            req.flash('success', 'Kar Berhasil Dihapus')
            res.redirect('/karyawan')
        }
    })
})

module.exports = router
