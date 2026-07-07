import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.vfs

export const gerarPdfAluguel = (aluguel: any) => {

  if (!aluguel) return

  const formatarData = (data?: string) => {
    if (!data) return '-'

    return new Date(data).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
    )
  }

  const estado =
    ({
      ativo: '🟢 Ativo',
      reservado: '🟡 Reservado',
      retornado: '🔵 Retornado',
      cancelado: '🔴 Cancelado'
    } as any)[aluguel.estado] || aluguel.estado

  const equipamentos = aluguel.equipamentos || []

  const body = [
    [
      { text: 'Código', style: 'tableHeader' },
      { text: 'Marca', style: 'tableHeader' },
      { text: 'Modelo', style: 'tableHeader' },
      { text: 'Série', style: 'tableHeader' }
    ],

    ...equipamentos.map((eq: any) => ([
      eq.codigo_interno,
      eq.marca,
      eq.modelo,
      eq.numero_serie || '-'
    ]))
  ]

  const docDefinition: any = {

    pageSize: 'A4',

    pageMargins: [40, 50, 40, 50],

    footer: (
      currentPage: number,
      pageCount: number
    ) => ({
      columns: [
        {
          text:
            `Emitido em ${new Date().toLocaleDateString('pt-BR')}`,
          margin: [40, 0, 0, 0],
          fontSize: 9,
          color: '#666'
        },
        {
          text:
            `Página ${currentPage} / ${pageCount}`,
          alignment: 'right',
          margin: [0, 0, 40, 0],
          fontSize: 9,
          color: '#666'
        }
      ]
    }),

    content: [

      //------------------------------------
      // CABEÇALHO
      //------------------------------------

      {
        text: 'BLACK NOISE PRODUÇÕES',
        style: 'empresa'
      },

      {
        text: 'TERMO DE LOCAÇÃO DE EQUIPAMENTOS',
        style: 'title'
      },

      {
        text: `Aluguel Nº ${aluguel.id}`,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },

      //------------------------------------
      // CLIENTE
      //------------------------------------

      {

        table: {

          widths: ['50%', '50%'],

          body: [

            [

              {

                stack: [

                  {
                    text: 'CLIENTE',
                    style: 'label'
                  },

                  aluguel.cliente,

                  {
                    text: '\nTelefone',
                    style: 'label'
                  },

                  aluguel.telefone || '-',

                  {
                    text: '\nEmail',
                    style: 'label'
                  },

                  aluguel.email || '-'

                ]

              },

              {

                stack: [

                  {
                    text: 'Data de saída',
                    style: 'label'
                  },

                  formatarData(
                    aluguel.fecha_salida
                  ),

                  {
                    text: '\nData de retorno',
                    style: 'label'
                  },

                  formatarData(
                    aluguel.fecha_retorno
                  ),

                  {
                    text: '\nStatus',
                    style: 'label'
                  },

                  estado

                ]

              }

            ]

          ]

        },

        layout: {
          fillColor: () => '#F8F9FA'
        }

      },

      //------------------------------------
      // RESUMO
      //------------------------------------

      {
        margin: [0, 20, 0, 20],

        table: {

          widths: ['50%', '50%'],

          body: [

            [

              {

                text:
                  `Quantidade de equipamentos\n\n${equipamentos.length}`,

                style: 'infoCard'

              },

              {

                text:
                  `Estado do aluguel\n\n${estado}`,

                style: 'infoCard'

              }

            ]

          ]

        },

        layout: {
          fillColor: () => '#ECEFF1'
        }

      },

      //------------------------------------
      // EQUIPAMENTOS
      //------------------------------------

      {
        text: 'Equipamentos',
        style: 'subtitle'
      },

      {

        table: {

          headerRows: 1,

          widths: [70, 90, '*', 110],

          body

        },

        layout: {

          fillColor: (row: number) =>
            row === 0 ? '#1976D2' : null,

          hLineColor: '#DDDDDD',

          vLineColor: '#DDDDDD'

        }

      },

      //------------------------------------
      // OBSERVAÇÕES
      //------------------------------------

      {
        text: 'Observações',
        style: 'subtitle'
      },

      {

        table: {

          widths: ['*'],

          body: [

            [
              aluguel.observacoes ||
              'Nenhuma observação.'
            ]

          ]

        }

      },

      //------------------------------------
      // ASSINATURAS
      //------------------------------------

      {

        margin: [0, 70, 0, 0],

        columns: [

          [

            {
              text:
                '____________________________'
            },

            {
              text: 'Cliente',
              alignment: 'center'
            }

          ],

          [

            {
              text:
                '____________________________'
            },

            {
              text:
                'Responsável pela entrega',
              alignment: 'center'
            }

          ],

          [

            {
              text:
                '____________________________'
            },

            {
              text:
                'Responsável pela devolução',
              alignment: 'center'
            }

          ]

        ]

      }

    ],

    styles: {

      empresa: {
        fontSize: 24,
        bold: true,
        color: '#1976D2',
        alignment: 'center'
      },

      title: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 20]
      },

      subtitle: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10]
      },

      label: {
        bold: true,
        color: '#1976D2'
      },

      infoCard: {
        alignment: 'center',
        bold: true,
        margin: [0, 10, 0, 10]
      },

      tableHeader: {
        bold: true,
        color: 'white',
        alignment: 'center'
      }

    }

  }

  pdfMake.createPdf(docDefinition).open()

}
