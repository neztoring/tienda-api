import { ProductoEntity } from "src/producto/producto.entity/producto.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TiendaEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;

    @Column()
    ciudad: string;

    @Column()
    direccion: string;

    @ManyToMany(() => ProductoEntity, producto => producto.tiendas)
    productos: ProductoEntity[];

}

